type EventMap = {
  [event: string]: (...args: any[]) => void;
};

class EventEmitter<T extends EventMap> {
  private listeners: { [K in keyof T]?: T[K][] } = {};

  on<K extends keyof T>(event: K, listener: T[K]): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]?.push(listener);
  }

  off<K extends keyof T>(event: K, listener: T[K]): void {
    const listeners = this.listeners[event];
    if (!listeners) return;
    this.listeners[event] = listeners.filter(l => l !== listener);
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    this.listeners[event]?.forEach(listener => {
      listener(...args);
    });
  }

  removeAllListeners<K extends keyof T>(event?: K): void {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
  }
}

export default EventEmitter;

// Example Usage:
interface MyEvents {
  data: (data: string) => void;
  error: (error: Error) => void;
  complete: () => void;
}

const myEmitter = new EventEmitter<MyEvents>();

myEmitter.on('data', (data) => {
  console.log('Data received:', data);
});

myEmitter.on('error', (error) => {
  console.error('Error occurred:', error.message);
});

myEmitter.on('complete', () => {
  console.log('Process completed');
});

myEmitter.emit('data', 'Hello, world!');
myEmitter.emit('error', new Error('Something went wrong'));
myEmitter.emit('complete');