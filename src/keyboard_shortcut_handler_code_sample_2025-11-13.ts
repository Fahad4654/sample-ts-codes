type KeyCombo = string;
type KeyHandler = (event: KeyboardEvent) => void;

class ShortcutManager {
  private shortcuts: Map<KeyCombo, KeyHandler> = new Map();

  registerShortcut(keyCombo: KeyCombo, handler: KeyHandler): void {
    this.shortcuts.set(keyCombo, handler);
  }

  unregisterShortcut(keyCombo: KeyCombo): void {
    this.shortcuts.delete(keyCombo);
  }

  handleKeyDown(event: KeyboardEvent): void {
    const keyCombo = this.getKeyCombo(event);
    const handler = this.shortcuts.get(keyCombo);

    if (handler) {
      event.preventDefault();
      handler(event);
    }
  }

  private getKeyCombo(event: KeyboardEvent): KeyCombo {
    let combo = "";
    if (event.ctrlKey) combo += "Ctrl+";
    if (event.shiftKey) combo += "Shift+";
    if (event.altKey) combo += "Alt+";
    combo += event.key.toUpperCase();
    return combo;
  }

  constructor() {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }
}


const shortcutManager = new ShortcutManager();

shortcutManager.registerShortcut("Ctrl+S", (event) => {
  console.log("Saving...");
});

shortcutManager.registerShortcut("Ctrl+Shift+D", (event) => {
  console.log("Duplicating...");
});