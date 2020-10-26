export function matrix2Array(input) {
  let inputData = input;
  let nRows, nCols;
  if (typeof input[0] !== 'number') {
    nRows = input.length;
    nCols = input[0].length;
    inputData = new Array(nRows * nCols);
    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nCols; j++) {
        inputData[i * nCols + j] = input[i][j];
      }
    }
  } else {
    let tmp = Math.sqrt(input.length);
    if (Number.isInteger(tmp)) {
      nRows = tmp;
      nCols = tmp;
    }
  }

  return { data: inputData, rows: nRows, cols: nCols };
}
