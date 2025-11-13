type Callback = (time: number) => void;

class AnimationFrameScheduler {
  private callbacks: Callback[] = [];
  private isRunning: boolean = false;

  add(callback: Callback): void {
    this.callbacks.push(callback);
    if (!this.isRunning) {
      this.isRunning = true;
      this.scheduleFrame();
    }
  }

  private scheduleFrame(): void {
    requestAnimationFrame((time) => this.runFrame(time));
  }

  private runFrame(time: number): void {
    const currentCallbacks = [...this.callbacks];
    this.callbacks = [];
    this.isRunning = false;

    for (const callback of currentCallbacks) {
      callback(time);
    }

    if (this.callbacks.length > 0) {
      this.isRunning = true;
      this.scheduleFrame();
    }
  }

  cancel(callbackToRemove: Callback): void {
    this.callbacks = this.callbacks.filter(cb => cb !== callbackToRemove);
    if (this.callbacks.length === 0) {
      this.isRunning = false;
    }
  }
}

export default AnimationFrameScheduler;

// Example usage:
// const scheduler = new AnimationFrameScheduler();
// const myCallback = (time: number) => console.log("Frame:", time);
// scheduler.add(myCallback);
// scheduler.cancel(myCallback);