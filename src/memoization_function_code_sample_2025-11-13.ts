function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  } as T;
}

// Example Usage:
const expensiveOperation = (a: number, b: number): number => {
  console.log("Performing expensive operation...");
  return a + b;
};

const memoizedOperation = memoize(expensiveOperation);

console.log(memoizedOperation(2, 3));
console.log(memoizedOperation(2, 3));
console.log(memoizedOperation(4, 5));