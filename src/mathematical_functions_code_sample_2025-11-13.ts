const factorial = (n: number): number => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

const isPrime = (n: number): boolean => {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const hypotenuse = (a: number, b: number): number => {
  return Math.sqrt(a * a + b * b);
};

const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export { factorial, isPrime, fibonacci, hypotenuse, clamp };