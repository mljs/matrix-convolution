# ml-matrix-convolution

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Matrix convolution.

## Installation

```console
npm i ml-matrix-convolution
```

```js
const MatrixConvolution = require('ml-matrix-convolution');

let matrix = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

let kernel = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

let conv1 = MatrixConvolution.direct(matrix, kernel);

let conv2 = MatrixConvolution.fft(matrix, kerne11);

console.log({ conv1, conv2 }); // both should be equal
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-matrix-convolution.svg
[npm-url]: https://npmjs.org/package/ml-matrix-convolution
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/matrix-convolution.svg
[codecov-url]: https://codecov.io/gh/mljs/matrix-convolution
[ci-image]: https://github.com/mljs/matrix-convolution/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/mljs/matrix-convolution/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/ml-matrix-convolution.svg
[download-url]: https://npmjs.org/package/ml-matrix-convolution
