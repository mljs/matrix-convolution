import { FFTUtils } from 'ml-fft';

import { matrix2Array } from './util/matrix2Array';

export function convolutionFFT(input, kernel, opt) {
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
  if (options.normalize) {
    divisor = 0;
    for (let i = 0; i < kHeight; i++) {
      for (let j = 0; j < kWidth; j++) divisor += kernel[i][j];
    }
  }
  if (divisor === 0) {
    throw new RangeError('convolution: The divisor is equal to zero');
  }

  let radix2Sized = FFTUtils.toRadix2(inputData, nRows, nCols);
  let conv = FFTUtils.convolute(
    radix2Sized.data,
    kernel,
    radix2Sized.rows,
    radix2Sized.cols,
  );
  conv = FFTUtils.crop(conv, radix2Sized.rows, radix2Sized.cols, nRows, nCols);

  if (divisor !== 0 && divisor !== 1) {
    for (let i = 0; i < conv.length; i++) {
      conv[i] /= divisor;
    }
  }

  return conv;
}
