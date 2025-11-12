interface MarkdownNode {
  type: string;
  content?: string;
  children?: MarkdownNode[];
}

function parseMarkdown(markdown: string): MarkdownNode[] {
  const lines = markdown.split('\n');
  const root: MarkdownNode[] = [];
  let currentParent: MarkdownNode[] = root;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      currentParent.push({ type: 'h1', content: line.substring(2) });
    } else if (line.startsWith('## ')) {
      currentParent.push({ type: 'h2', content: line.substring(3) });
    } else if (line.startsWith('- ')) {
      currentParent.push({ type: 'li', content: line.substring(2) });
    } else if (line.startsWith('> ')) {
      currentParent.push({ type: 'blockquote', content: line.substring(2) });
    } else if (line === '---') {
      currentParent.push({ type: 'hr' });
    } else if (line.trim() !== '') {
      currentParent.push({ type: 'p', content: line });
    }
  }

  return root;
}

function renderMarkdown(nodes: MarkdownNode[]): string {
  let html = '';
  for (const node of nodes) {
    switch (node.type) {
      case 'h1': html += `<h1>${node.content}</h1>`; break;
      case 'h2': html += `<h2>${node.content}</h2>`; break;
      case 'p': html += `<p>${node.content}</p>`; break;
      case 'li': html += `<li>${node.content}</li>`; break;
      case 'blockquote': html += `<blockquote>${node.content}</blockquote>`; break;
      case 'hr': html += `<hr>`; break;
    }
  }
  return html;
}

// Example usage:
const markdownText = `# Hello World\n\nThis is a paragraph.\n\n- List item 1\n- List item 2\n\n> A quote\n\n## Subheading\n\n---\nAnother paragraph.`;
const ast = parseMarkdown(markdownText);
const htmlOutput = renderMarkdown(ast);
console.log(htmlOutput);