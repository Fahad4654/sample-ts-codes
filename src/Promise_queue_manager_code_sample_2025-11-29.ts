class PromiseQueue {
  private queue: (() => Promise<any>)[] = [];
  private running: boolean = false;

  enqueue<T>(promiseFn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(() => promiseFn().then(resolve).catch(reject));
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error("PromiseQueue error:", error);
        }
      }
    }

    this.running = false;
  }
}

export default PromiseQueue;

// Example usage:
// const queue = new PromiseQueue();
//
// const task1 = () => new Promise(resolve => setTimeout(() => { console.log("Task 1"); resolve("Result 1"); }, 100));
// const task2 = () => new Promise(resolve => setTimeout(() => { console.log("Task 2"); resolve("Result 2"); }, 50));
//
// queue.enqueue(task1).then(result => console.log("Task 1 completed with:", result));
// queue.enqueue(task2).then(result => console.log("Task 2 completed with:", result));