function* fibonacciSequence(max: number | null = null): Generator<number, void, undefined> {
  let a = 0;
  let b = 1;
  while (true) {
    if (max !== null && a > max) {
      return;
    }
    yield a;
    [a, b] = [b, a + b];
  }
}

function fibonacciArray(count: number): number[] {
  const result: number[] = [];
  for (const num of fibonacciSequence()) {
    if (result.length >= count) {
      break;
    }
    result.push(num);
  }
  return result;
}

// Example Usage:
const firstTen = fibonacciArray(10);
console.log(firstTen);

const upToHundred = [...fibonacciSequence(100)];
console.log(upToHundred);