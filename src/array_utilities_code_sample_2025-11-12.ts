namespace ArrayUtils {
  export function findDuplicates<T>(arr: T[]): T[] {
    const counts = new Map<T, number>();
    const duplicates: T[] = [];

    for (const item of arr) {
      counts.set(item, (counts.get(item) || 0) + 1);
    }

    for (const [item, count] of counts) {
      if (count > 1) {
        duplicates.push(item);
      }
    }

    return duplicates;
  }

  export function groupBy<T, K extends keyof any>(arr: T[], key: (item: T) => K): Record<K, T[]> {
    return arr.reduce((result: Record<K, T[]>, item: T) => {
      const groupKey = key(item);
      (result[groupKey] = result[groupKey] || []).push(item);
      return result;
    }, {} as Record<K, T[]>);
  }

  export function chunk<T>(arr: T[], size: number): T[][] {
    if (size <= 0) {
      throw new Error("Chunk size must be greater than zero");
    }

    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}

// Example Usage
const numbers = [1, 2, 2, 3, 4, 4, 5];
const duplicates = ArrayUtils.findDuplicates(numbers);
console.log("Duplicates:", duplicates);

const objects = [{ category: 'A', value: 1 }, { category: 'B', value: 2 }, { category: 'A', value: 3 }];
const grouped = ArrayUtils.groupBy(objects, item => item.category);
console.log("Grouped:", grouped);

const bigArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunks = ArrayUtils.chunk(bigArray, 3);
console.log("Chunks:", chunks);