import { matrix2Array } from './util/matrix2Array';

export function convolutionDirect(input, kernel, opt) {
  let tmp = matrix2Array(input);
  let inputData = tmp.data;
  let options = Object.assign(
    { normalize: false, divisor: 1, rows: tmp.rows, cols: tmp.cols },
    opt,
  );

  let nRows, nCols;
  if (options.rows && options.cols) {
    nRows = options.rows;
    nCols = options.cols;
  } else {
    throw new Error(`Invalid number of rows or columns ${nRows} ${nCols}`);
  }

  let divisor = options.divisor;
  let kHeight = kernel.length;
  let kWidth = kernel[0].length;
  let index, sum, kVal, row, col;
  if (options.normalize) {
    divisor = 0;
    for (let i = 0; i < kHeight; i++) {
      for (let j = 0; j < kWidth; j++) divisor += kernel[i][j];
    }
  }
  if (divisor === 0) {
    throw new RangeError('convolution: The divisor is equal to zero');
  }

  let output = new Array(nRows * nCols);

  let hHeight = Math.floor(kHeight / 2);
  let hWidth = Math.floor(kWidth / 2);

  for (let y = 0; y < nRows; y++) {
    for (let x = 0; x < nCols; x++) {
      sum = 0;
      for (let j = 0; j < kHeight; j++) {
        for (let i = 0; i < kWidth; i++) {
          kVal = kernel[kHeight - j - 1][kWidth - i - 1];
          row = (y + j - hHeight + nRows) % nRows;
          col = (x + i - hWidth + nCols) % nCols;
          index = row * nCols + col;
          sum += inputData[index] * kVal;
        }
      }
      index = y * nCols + x;
      output[index] = sum / divisor;
    }
  }
  return output;
}
