type StateUpdater<T> = (prevState: T) => T;
type StateListener<T> = (newState: T) => void;

class StateManager<T> {
  private state: T;
  private listeners: StateListener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(updater: T | StateUpdater<T>): void {
    const newState = typeof updater === 'function'
      ? (updater as StateUpdater<T>)(this.state)
      : updater;

    if (newState !== this.state) {
      this.state = newState;
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  subscribe(listener: StateListener<T>): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export default StateManager;