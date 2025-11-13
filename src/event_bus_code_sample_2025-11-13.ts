type EventName = string | symbol;

type Handler<T = any> = (data: T) => void;

class EventBus {
    private handlers: Map<EventName, Handler[]> = new Map();

    on<T = any>(event: EventName, handler: Handler<T>): void {
        const existingHandlers = this.handlers.get(event) || [];
        this.handlers.set(event, [...existingHandlers, handler]);
    }

    off<T = any>(event: EventName, handler: Handler<T>): void {
        const existingHandlers = this.handlers.get(event);
        if (!existingHandlers) return;

        this.handlers.set(
            event,
            existingHandlers.filter(h => h !== handler)
        );
    }

    emit<T = any>(event: EventName, data: T): void {
        const handlers = this.handlers.get(event);
        if (!handlers) return;

        handlers.forEach(handler => handler(data));
    }
}

export default EventBus;

// Example Usage
const bus = new EventBus();

interface User {
    id: number;
    name: string;
}

const userCreatedHandler = (user: User) => {
    console.log(`User created: ${user.name}`);
};

bus.on<User>("user.created", userCreatedHandler);

bus.emit<User>("user.created", { id: 1, name: "John Doe" });

bus.off<User>("user.created", userCreatedHandler);

bus.emit<User>("user.created", { id: 2, name: "Jane Doe" }); // Nothing happens