// worker-manager.ts
type WorkerMessage<T> = {
  id: string;
  type: string;
  payload: T;
};

class WorkerManager<T, R> {
  private worker: Worker;
  private messageHandlers: Map<string, (payload: R) => void> = new Map();
  private nextId: number = 0;

  constructor(workerPath: string) {
    this.worker = new Worker(workerPath);
    this.worker.onmessage = (event: MessageEvent<WorkerMessage<R>>) => {
      const message = event.data;
      const handler = this.messageHandlers.get(message.id);
      if (handler) {
        handler(message.payload);
        this.messageHandlers.delete(message.id);
      }
    };
  }

  public postMessage(type: string, payload: T): Promise<R> {
    const id = this.nextId.toString();
    this.nextId++;

    return new Promise((resolve) => {
      this.messageHandlers.set(id, resolve);
      const message: WorkerMessage<T> = { id, type, payload };
      this.worker.postMessage(message);
    });
  }

  public terminate(): void {
    this.worker.terminate();
  }
}

export { WorkerManager, WorkerMessage };
```
```typescript
// worker.ts
import { WorkerMessage } from './worker-manager';

addEventListener('message', (event: MessageEvent<WorkerMessage<number>>) => {
  const message = event.data;
  if (message.type === 'square') {
    const result = message.payload * message.payload;
    const response: WorkerMessage<number> = {
      id: message.id,
      type: 'squareResult',
      payload: result,
    };
    postMessage(response);
  }
});
```

```typescript
// main.ts
import { WorkerManager } from './worker-manager';

async function main() {
  const workerManager = new WorkerManager<number, number>('./worker.ts');

  const squareResult = await workerManager.postMessage('square', 5);
  console.log('Square result:', squareResult); // Output: Square result: 25

  workerManager.terminate();
}

main();