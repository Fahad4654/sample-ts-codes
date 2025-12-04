interface Task {
  id: string;
  execute: () => Promise<void>;
  priority: number;
  scheduledTime: Date;
}

class TaskScheduler {
  private taskQueue: Task[] = [];
  private isRunning: boolean = false;

  addTask(task: Task): void {
    this.taskQueue.push(task);
    this.taskQueue.sort((a, b) => a.scheduledTime.getTime() - b.scheduledTime.getTime() || b.priority - a.priority);
    if (!this.isRunning) {
      this.start();
    }
  }

  private async runTask(task: Task): Promise<void> {
    try {
      await task.execute();
    } catch (error) {
      console.error(`Task ${task.id} failed:`, error);
    }
  }

  private async start(): Promise<void> {
    this.isRunning = true;
    while (this.taskQueue.length > 0) {
      const now = new Date();
      const nextTask = this.taskQueue[0];

      if (nextTask.scheduledTime <= now) {
        const task = this.taskQueue.shift()!;
        await this.runTask(task);
      } else {
        const delay = nextTask.scheduledTime.getTime() - now.getTime();
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    this.isRunning = false;
  }
}

// Example Usage:
const scheduler = new TaskScheduler();

const task1: Task = {
  id: "task1",
  execute: async () => { console.log("Task 1 executed!"); },
  priority: 1,
  scheduledTime: new Date(Date.now() + 2000) // 2 seconds from now
};

const task2: Task = {
  id: "task2",
  execute: async () => { console.log("Task 2 executed!"); },
  priority: 2,
  scheduledTime: new Date(Date.now() + 1000) // 1 second from now
};

scheduler.addTask(task1);
scheduler.addTask(task2);