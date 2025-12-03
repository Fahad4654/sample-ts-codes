namespace Utils {
  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  export function throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    let lastFunc: ReturnType<typeof setTimeout> | undefined;
    let lastRan: number;

    return function (...args: Parameters<T>) {
      if (!inThrottle) {
        func(...args);
        lastRan = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
}

// Example Usage:
const throttledLog = Utils.throttle((arg: string) => console.log(arg), 500);
const debouncedLog = Utils.debounce((arg: string) => console.log(arg), 500);

// Simulate events:
throttledLog("Throttle 1");
throttledLog("Throttle 2");
setTimeout(() => throttledLog("Throttle 3"), 600);

debouncedLog("Debounce 1");
debouncedLog("Debounce 2");
setTimeout(() => debouncedLog("Debounce 3"), 600);