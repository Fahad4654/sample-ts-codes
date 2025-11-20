interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

type ObserverCallback = (entry: IntersectionObserverEntry) => void;

const createIntersectionObserver = (
  element: Element,
  callback: ObserverCallback,
  options: IntersectionOptions = {}
): IntersectionObserver => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === element) {
          callback(entry);
        }
      });
    },
    options
  );

  observer.observe(element);
  return observer;
};

export default createIntersectionObserver;