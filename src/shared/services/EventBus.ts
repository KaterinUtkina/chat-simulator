type EventHandler = () => void;

class EventBus<Events extends string> {
    private events: { [K in Events]?: EventHandler[] } = {};

    on(event: Events, handler: EventHandler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event]!.push(handler);
    }

    off(event: Events, handler: EventHandler) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event]!.filter(h => h !== handler);
    }

    emit(event: Events) {
        if (!this.events[event]) return;
        this.events[event]!.forEach(handler => handler());
    }
}

export const eventBus = new EventBus();
