import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';

import * as MatrixConvolution from '..';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

let rows = 5;
let cols = 5;
let matrix = new Array(rows);

for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(cols);
  for (let j = 0; j < cols; j++) {
    matrix[i][j] = 1;
  }
}

let kerne11 = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];
let kerne12 = [
  [1, 1],
  [1, 1],
];

let result1 = [
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
];
let result2 = [
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
];

let smallFilter = [
  [0, 0, 1, 2, 2, 2, 1, 0, 0],
  [0, 1, 3, 5, 5, 5, 3, 1, 0],
  [1, 3, 5, 3, 0, 3, 5, 3, 1],
  [2, 5, 3, -12, -23, -12, 3, 5, 2],
  [2, 5, 0, -23, -40, -23, 0, 5, 2],
  [2, 5, 3, -12, -23, -12, 3, 5, 2],
  [1, 3, 5, 3, 0, 3, 5, 3, 1],
  [0, 1, 3, 5, 5, 5, 3, 1, 0],
  [0, 0, 1, 2, 2, 2, 1, 0, 0],
];

describe('Direct convolution', function () {
  it('Odd number of rows and columns', function () {
    let conv = MatrixConvolution.direct(matrix, kerne11);
    expect(conv).toMatchCloseTo(result1, 1e-8);
  });
  it('Even number of rows and columns', function () {
    let conv = MatrixConvolution.direct(matrix, kerne12);
    expect(conv).toMatchCloseTo(result2, 1e-8);
  });
});
describe('FFT convolution', function () {
  it('Odd number of rows and columns', function () {
    let conv = MatrixConvolution.fft(matrix, kerne11);
    expect(conv).toMatchCloseTo(result1, 1e-8);
  });
  it('Even number of rows and columns', function () {
    let conv = MatrixConvolution.fft(matrix, kerne12);
    expect(conv).toMatchCloseTo(result2, 1e-8);
  });
});

describe('KernelFatory', function () {
  it('LoG', function () {
    let kernel = MatrixConvolution.kernelFactory.LoG(1.4, 9, { factor: 40 });
    expect(kernel).toMatchCloseTo(smallFilter, 1e-8);
  });
});
