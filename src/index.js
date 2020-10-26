import { LoG } from './util/LoG';

export { convolutionFFT as fft } from './convolutionFFT';
export { convolutionDirect as direct } from './convolutionDirect';
export { matrix2Array } from './util/matrix2Array';
export const kernelFactory = {
  LoG: LoG,
};
