function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function quickSortInPlace(arr: number[], low: number, high: number): void {
    if (low < high) {
        const pi = partition(arr, low, high);

        quickSortInPlace(arr, low, pi - 1);
        quickSortInPlace(arr, pi + 1, high);
    }
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}

function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Example Usage:
const unsortedArray = [5, 2, 8, 1, 9, 4, 7, 6, 3];
const sortedArray = quickSort(unsortedArray);
console.log("Sorted array (functional):", sortedArray);

const unsortedArray2 = [5, 2, 8, 1, 9, 4, 7, 6, 3];
quickSortInPlace(unsortedArray2, 0, unsortedArray2.length - 1);
console.log("Sorted array (in-place):", unsortedArray2);