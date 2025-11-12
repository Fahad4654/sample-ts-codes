type SortDirection = 'asc' | 'desc';

type Sortable<T> = {
  [key: string]: T[keyof T];
};

function sortData<T extends Sortable<T>>(
  data: T[],
  key: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return [...data].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === undefined || valueB === undefined) {
      return 0;
    }

    const comparison = (typeof valueA === 'string' && typeof valueB === 'string')
      ? valueA.localeCompare(valueB)
      : (valueA > valueB ? 1 : (valueA < valueB ? -1 : 0));

    return direction === 'asc' ? comparison : -comparison;
  });
}

export { sortData, SortDirection };