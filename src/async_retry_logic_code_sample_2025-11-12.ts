type RetryOptions = {
  maxRetries: number;
  delay: number;
};

const retry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> => {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt > options.maxRetries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
  }
};

export default retry;