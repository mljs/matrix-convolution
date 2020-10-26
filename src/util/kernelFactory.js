export function LoG(sigma, nPoints, options) {
  let factor = 1000;
  if (options && options.factor) {
    factor = options.factor;
  }

  let kernel = new Array(nPoints);
  let tmp, y2;

  factor *= -1; //-1/(Math.PI*Math.pow(sigma,4));
  let center = (nPoints - 1) / 2;
  let sigma2 = 2 * sigma * sigma;
  for (let i = 0; i < nPoints; i++) {
    kernel[i] = new Array(nPoints);
    y2 = (i - center) * (i - center);
    for (let j = 0; j < nPoints; j++) {
      tmp = -((j - center) * (j - center) + y2) / sigma2;
      kernel[i][j] = Math.round(factor * (1 + tmp) * Math.exp(tmp));
    }
  }

  return kernel;
}
