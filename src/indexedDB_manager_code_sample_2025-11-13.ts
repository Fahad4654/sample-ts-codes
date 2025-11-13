interface IDBConfig<T> {
  dbName: string;
  version: number;
  objectStores: {
    name: string;
    keyPath?: string;
    autoIncrement?: boolean;
    indices?: { name: string; keyPath: string; unique?: boolean }[];
  }[];
}

class IndexedDBManager<T> {
  private db: IDBDatabase | null = null;

  constructor(private config: IDBConfig<T>) {}

  async open(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, this.config.version);

      request.onerror = () => reject(new Error('Failed to open database'));
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBRequest).result as IDBDatabase;

        this.config.objectStores.forEach((storeConfig) => {
          if (!db.objectStoreNames.contains(storeConfig.name)) {
            const objectStore = db.createObjectStore(storeConfig.name, {
              keyPath: storeConfig.keyPath,
              autoIncrement: storeConfig.autoIncrement,
            });

            storeConfig.indices?.forEach((indexConfig) => {
              objectStore.createIndex(indexConfig.name, indexConfig.keyPath, {
                unique: indexConfig.unique,
              });
            });
          }
        });
      };
    });
  }

  async add(storeName: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.add(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to add data'));
    });
  }

  async get(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get data'));
    });
  }

  async getAll(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not open'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get all data'));
    });
  }

  async update(storeName: string, data: T, key: IDBValidKey): Promise<void> {
      return new Promise((resolve, reject) => {
          if (!this.db) {
              reject(new Error('Database not open'));
              return;
          }

          const transaction = this.db.transaction(storeName, 'readwrite');
          const objectStore = transaction.objectStore(storeName);
          const request = objectStore.put(data, key);

          request.onsuccess = () => resolve();
          request.onerror = () => reject(new Error('Failed to update data'));
      });
  }

  async delete(storeName: string, key: IDBValidKey): Promise<void> {
      return new Promise((resolve, reject) => {
          if (!this.db) {
              reject(new Error('Database not open'));
              return;
          }

          const transaction = this.db.transaction(storeName, 'readwrite');
          const objectStore = transaction.objectStore(storeName);
          const request = objectStore.delete(key);

          request.onsuccess = () => resolve();
          request.onerror = () => reject(new Error('Failed to delete data'));
      });
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}