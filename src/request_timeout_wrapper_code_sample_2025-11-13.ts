async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = `Request timed out after ${timeoutMs}ms`
): Promise<T> {
  let timeoutHandle: NodeJS.Timeout;

  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      timeoutHandle = setTimeout(() => {
        reject(new Error(errorMessage));
      }, timeoutMs);
    }),
  ]).finally(() => {
    clearTimeout(timeoutHandle);
  });
}

async function fetchData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function main() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  try {
    const data = await withTimeout(fetchData(url), 1000);
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// main();