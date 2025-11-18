interface VNode {
  type: string;
  props: Record<string, any>;
  children: VNode[] | string;
}

function diff(oldNode: VNode | null, newNode: VNode | null): (HTMLElement | Text | null) => void {
  if (!newNode) {
    return () => null;
  }

  if (!oldNode) {
    return () => createDOM(newNode);
  }

  if (oldNode.type !== newNode.type) {
    return () => {
      const newDOM = createDOM(newNode);
      const oldDOM = findDOM(oldNode);
      oldDOM?.parentNode?.replaceChild(newDOM, oldDOM);
      return newDOM;
    };
  }

  const patchProps = diffProps(oldNode.props, newNode.props);
  const patchChildren = diffChildren(oldNode.children, newNode.children);

  return (dom: HTMLElement | Text | null) => {
    if (!dom || typeof dom === 'string') return dom;

    patchProps(dom);
    patchChildren(dom);
    return dom;
  };
}

function diffProps(oldProps: Record<string, any>, newProps: Record<string, any>): (dom: HTMLElement) => void {
  const patches: ((dom: HTMLElement) => void)[] = [];

  for (const key in oldProps) {
    if (!(key in newProps)) {
      patches.push((dom) => dom.removeAttribute(key));
    }
  }

  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      patches.push((dom) => {
        if (key.startsWith('on')) {
           const eventName = key.substring(2).toLowerCase();
           dom.removeEventListener(eventName, oldProps[key]);
           dom.addEventListener(eventName, newProps[key]);
        } else {
          (dom as any)[key] = newProps[key];
        }
      });
    }
  }

  return (dom: HTMLElement) => {
    patches.forEach(patch => patch(dom));
  };
}

function diffChildren(oldChildren: VNode[] | string, newChildren: VNode[] | string): (dom: HTMLElement) => void {
  if (typeof oldChildren === 'string' || typeof newChildren === 'string') {
    if (oldChildren !== newChildren) {
      return (dom) => {
        dom.textContent = String(newChildren);
      };
    } else {
      return () => {};
    }
  }

  const patches: ((dom: HTMLElement) => void)[] = [];
  const maxLength = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLength; i++) {
    const patch = diff(oldChildren[i] || null, newChildren[i] || null);
    patches.push((dom) => {
      const childDOM = dom.childNodes[i];
      const newDom = patch(childDOM as HTMLElement);
      if (newDom && childDOM && newDom !== childDOM) {
        dom.replaceChild(newDom, childDOM);
      } else if (newDom && !childDOM){
        dom.appendChild(newDom)
      }
    });
  }

  return (dom: HTMLElement) => {
    patches.forEach(patch => patch(dom));
  };
}

function createDOM(node: VNode): HTMLElement | Text {
  if (typeof node.children === 'string') {
    return document.createTextNode(node.children);
  }

  const element = document.createElement(node.type);

  for (const key in node.props) {
    if (key.startsWith('on')) {
       const eventName = key.substring(2).toLowerCase();
       element.addEventListener(eventName, node.props[key]);
    }
    else{
        (element as any)[key] = node.props[key]
    }

  }

  node.children.forEach(child => {
    element.appendChild(createDOM(child));
  });

  return element;
}

function findDOM(node: VNode): HTMLElement | null {
  // Simplified findDOM implementation - needs a better one for complex scenarios
  //  (e.g., using a map to store VNode -> DOM relationships during initial render)

  // A naive search; not ideal in prod
  function traverse(root: HTMLElement | Node): HTMLElement | null{
      if ('type' in root && (root as any).type === node.type) return root as HTMLElement;

      for (let i = 0; i < root.childNodes.length; i++){
         const found = traverse(root.childNodes[i])
         if (found) return found
      }

      return null
  }

  return traverse(document.body)

}