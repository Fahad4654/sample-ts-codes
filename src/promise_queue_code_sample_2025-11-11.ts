class PromiseQueue {
  private queue: (() => Promise<any>)[] = [];
  private running: boolean = false;

  add<T>(promiseFactory: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(() => promiseFactory().then(resolve, reject));
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift()!;
      try {
        await task();
      } catch (error) {
        console.error("PromiseQueue error:", error);
      }
    }

    this.running = false;
  }
}

export default PromiseQueue;

// Example usage:
async function example() {
  const queue = new PromiseQueue();

  const task1 = () => Promise.resolve("Task 1 completed");
  const task2 = () => Promise.resolve("Task 2 completed");
  const task3 = () => Promise.reject("Task 3 failed");
  const task4 = () => Promise.resolve("Task 4 completed");

  queue.add(task1).then(result => console.log(result));
  queue.add(task2).then(result => console.log(result));
  queue.add(task3).catch(error => console.error(error));
  queue.add(task4).then(result => console.log(result));
}

//example();