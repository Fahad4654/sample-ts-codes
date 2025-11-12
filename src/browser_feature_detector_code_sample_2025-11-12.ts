/**
 * Browser Feature Detector
 */
const browserFeatures = {
  supportsWebP: (): Promise<boolean> => {
    if (!self.createImageBitmap) {
      return Promise.resolve(false);
    }
    return new Promise(resolve => {
      const webPData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      fetch(webPData)
        .then(response => response.blob())
        .then(blob => createImageBitmap(blob))
        .then(() => resolve(true), () => resolve(false));
    });
  },

  supportsPassiveEventListeners: (): boolean => {
    let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          supportsPassive = true;
          return true; // TypeScript requires a return value.
        }
      });
      window.addEventListener("testPassive", null as any, opts);
      window.removeEventListener("testPassive", null as any, opts);
    } catch (e) {
      // Do nothing
    }
    return supportsPassive;
  },

  supportsIntersectionObserver: (): boolean => {
    return 'IntersectionObserver' in window;
  },

  supportsServiceWorker: (): boolean => {
    return 'serviceWorker' in navigator;
  }
};

export default browserFeatures;