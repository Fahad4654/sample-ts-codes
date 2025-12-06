type Matrix = number[][];

function matrixMultiply(a: Matrix, b: Matrix): Matrix | null {
  const aRows = a.length;
  const aCols = a[0].length;
  const bRows = b.length;
  const bCols = b[0].length;

  if (aCols !== bRows) {
    return null;
  }

  const result: Matrix = Array(aRows).fill(null).map(() => Array(bCols).fill(0));

  for (let i = 0; i < aRows; i++) {
    for (let j = 0; j < bCols; j++) {
      for (let k = 0; k < aCols; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
}

function createMatrix(rows: number, cols: number, initialValue: number = 0): Matrix {
  return Array(rows).fill(null).map(() => Array(cols).fill(initialValue));
}


//Example Usage:
const matrixA: Matrix = [[1, 2], [3, 4]];
const matrixB: Matrix = [[5, 6], [7, 8]];

const product: Matrix | null = matrixMultiply(matrixA, matrixB);

if (product) {
  console.log("Matrix A:", matrixA);
  console.log("Matrix B:", matrixB);
  console.log("Product:", product);
} else {
  console.log("Matrices cannot be multiplied due to incompatible dimensions.");
}