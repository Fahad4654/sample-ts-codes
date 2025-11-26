type ShortcutHandler = (event: KeyboardEvent) => void;

interface ShortcutMap {
  [keyCombo: string]: ShortcutHandler[];
}

class ShortcutManager {
  private shortcuts: ShortcutMap = {};

  constructor(private element: HTMLElement = document.body) {
    this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  registerShortcut(keyCombo: string, handler: ShortcutHandler): void {
    if (!this.shortcuts[keyCombo]) {
      this.shortcuts[keyCombo] = [];
    }
    this.shortcuts[keyCombo].push(handler);
  }

  unregisterShortcut(keyCombo: string, handler: ShortcutHandler): void {
    if (this.shortcuts[keyCombo]) {
      this.shortcuts[keyCombo] = this.shortcuts[keyCombo].filter(h => h !== handler);
      if (this.shortcuts[keyCombo].length === 0) {
        delete this.shortcuts[keyCombo];
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const keyCombo = this.getKeyCombo(event);
    if (this.shortcuts[keyCombo]) {
      this.shortcuts[keyCombo].forEach(handler => handler(event));
      event.preventDefault();
    }
  }

  private getKeyCombo(event: KeyboardEvent): string {
    const keys: string[] = [];
    if (event.ctrlKey) keys.push('Ctrl');
    if (event.shiftKey) keys.push('Shift');
    if (event.altKey) keys.push('Alt');
    if (event.metaKey) keys.push('Meta');
    keys.push(event.key);
    return keys.join('+');
  }
}

export default ShortcutManager;