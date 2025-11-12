type AnimationOptions = {
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
};

const animateElement = (
  element: HTMLElement,
  properties: Record<string, string | number>,
  options: AnimationOptions = {}
): Promise<void> => {
  const duration = options.duration || 300;
  const easing = options.easing || 'ease-out';

  return new Promise((resolve) => {
    element.style.transition = `all ${duration}ms ${easing}`;
    Object.assign(element.style, properties);

    setTimeout(() => {
      element.style.transition = ''; // Remove transition after animation
      resolve();
    }, duration);
  });
};

export default animateElement;