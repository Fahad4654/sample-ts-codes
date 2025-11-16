interface KeyPress {
  key: string;
  timestamp: number;
}

class KeyboardTracker {
  private keyPresses: KeyPress[] = [];
  private static instance: KeyboardTracker | null = null;

  private constructor() {
    document.addEventListener('keydown', (event) => {
      this.keyPresses.push({ key: event.key, timestamp: Date.now() });
    });
  }

  public static getInstance(): KeyboardTracker {
    if (!KeyboardTracker.instance) {
      KeyboardTracker.instance = new KeyboardTracker();
    }
    return KeyboardTracker.instance;
  }

  public getKeyPresses(): KeyPress[] {
    return [...this.keyPresses];
  }

  public clearKeyPresses(): void {
    this.keyPresses = [];
  }

  public getLastKeyPress(key: string): KeyPress | undefined {
    for (let i = this.keyPresses.length - 1; i >= 0; i--) {
      if (this.keyPresses[i].key === key) {
        return this.keyPresses[i];
      }
    }
    return undefined;
  }
}

export default KeyboardTracker;

// Example usage:
const tracker = KeyboardTracker.getInstance();

setTimeout(() => {
  const presses = tracker.getKeyPresses();
  console.log('Key presses:', presses);

  const lastA = tracker.getLastKeyPress('a');
  console.log('Last "a" press:', lastA);

  tracker.clearKeyPresses();
  console.log('Key presses after clear:', tracker.getKeyPresses());
}, 5000);