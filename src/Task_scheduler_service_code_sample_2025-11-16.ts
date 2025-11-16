interface Task {
  id: string;
  execute: () => Promise<void>;
  cronSchedule: string;
}

class Scheduler {
  private tasks: Task[] = [];
  private intervals: Record<string, NodeJS.Timeout> = {};

  addTask(task: Task): void {
    this.tasks.push(task);
    this.scheduleTask(task);
  }

  private scheduleTask(task: Task): void {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = task.cronSchedule.split(' ');

    const now = new Date();

    let nextExecution = new Date();
    nextExecution.setSeconds(0);
    nextExecution.setMilliseconds(0);


    const calculateNext = () => {
      nextExecution = new Date();
      nextExecution.setSeconds(0);
      nextExecution.setMilliseconds(0);

      while (true) {
        nextExecution.setMinutes(nextExecution.getMinutes() + 1);

        const currentMinute = nextExecution.getMinutes();
        const currentHour = nextExecution.getHours();
        const currentDayOfMonth = nextExecution.getDate();
        const currentMonth = nextExecution.getMonth() + 1;
        const currentDayOfWeek = nextExecution.getDay();

        const matchesMinute = minute === '*' || minute === currentMinute.toString();
        const matchesHour = hour === '*' || hour === currentHour.toString();
        const matchesDayOfMonth = dayOfMonth === '*' || dayOfMonth === currentDayOfMonth.toString();
        const matchesMonth = month === '*' || month === currentMonth.toString();
        const matchesDayOfWeek = dayOfWeek === '*' || dayOfWeek === currentDayOfWeek.toString();


        if (matchesMinute && matchesHour && matchesDayOfMonth && matchesMonth && matchesDayOfWeek) {
          break;
        }
      }
    };

    calculateNext();

    const delay = nextExecution.getTime() - now.getTime();

    this.intervals[task.id] = setTimeout(async () => {
      try {
        await task.execute();
      } catch (error) {
        console.error(`Task ${task.id} failed:`, error);
      } finally {
        this.scheduleTask(task); // Reschedule after execution
      }
    }, delay);
  }

  removeTask(taskId: string): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index > -1) {
      this.tasks.splice(index, 1);
      clearTimeout(this.intervals[taskId]);
      delete this.intervals[taskId];
    }
  }

  stop(): void {
    for (const taskId in this.intervals) {
      clearTimeout(this.intervals[taskId]);
      delete this.intervals[taskId];
    }
    this.tasks = [];
  }
}

export { Scheduler, Task };