# ml-matrix-convolution

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]
  
matrix convolution

## Installation

```bash
$ npm install ml-matrix-convolution
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

console.log({conv1, conv2}); // both should be equal
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-matrix-convolution.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-matrix-convolution
[download-image]: https://img.shields.io/npm/dm/ml-matrix-convolution.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-matrix-convolution