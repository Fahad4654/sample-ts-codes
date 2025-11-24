import { Subject } from 'rxjs';

interface Event {
  type: string;
  payload: any;
}

class EventStreamHandler {
  private eventStream = new Subject<Event>();

  subscribe(observer: (event: Event) => void): void {
    this.eventStream.subscribe(observer);
  }

  publish(event: Event): void {
    this.eventStream.next(event);
  }

  close(): void {
    this.eventStream.complete();
  }
}

// Example usage:
const handler = new EventStreamHandler();

handler.subscribe((event: Event) => {
  console.log(`Received event of type ${event.type}:`, event.payload);
});

handler.publish({ type: 'user_created', payload: { userId: 123, username: 'john.doe' } });
handler.publish({ type: 'item_added', payload: { itemId: 456, itemName: 'Widget' } });

// Close the stream when done (optional)
// handler.close();