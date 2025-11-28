type Serializable = string | number | boolean | object | null;

class LocalStorageManager {
  private readonly prefix: string;

  constructor(prefix = '') {
    this.prefix = prefix ? `${prefix}-` : '';
  }

  setItem<T extends Serializable>(key: string, value: T): void {
    const prefixedKey = this.prefix + key;
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }

  getItem<T extends Serializable>(key: string, defaultValue: T): T {
    const prefixedKey = this.prefix + key;
    const storedValue = localStorage.getItem(prefixedKey);
    return storedValue ? JSON.parse(storedValue) as T : defaultValue;
  }

  removeItem(key: string): void {
    const prefixedKey = this.prefix + key;
    localStorage.removeItem(prefixedKey);
  }

  clear(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
        i--;
      }
    }
  }

  key(index: number): string | null {
    const key = localStorage.key(index);
    if (key && key.startsWith(this.prefix)) {
      return key.slice(this.prefix.length);
    }
    return null;
  }

  length(): number {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        count++;
      }
    }
    return count;
  }
}

export default LocalStorageManager;