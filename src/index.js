'use strict;'
/**
 * Created by acastillo on 7/7/16.
 */
var FFTUtils = require("ml-fft").FFTUtils;

function convolutionFFT(input, kernel, opt) {
    var options = Object.assign({}, opt);
    var inputData = input;
    var nRows, nCols;
    if (typeof input[0] != "number") {
        nRows = input.length;
        nCols = input[0].length;
        inputData = new Array(nRows * nCols);
        for (var i = 0; i < nRows; i++) {
            for (var j = 0; j < nCols; j++) {
                inputData[i * nCols + j] = input[i][j];
            }
        }
    }
    else {
        nRows = options.rows;
        nCols = options.cols;
        if (!nRows || !nCols) {
            throw new Error("Invalid number of rows or columns " + nRows + " " + nCols);
        }
    }
    var radix2Sized = FFTUtils.toRadix2(inputData, nRows, nCols, {inplace:false});

    //var d = new Date();
    //var start = d.getTime();
    var convolutedSpectrum = FFTUtils.convolute(radix2Sized.data, kernel, radix2Sized.rows, radix2Sized.cols);
    //var d0 = new Date();
    //console.log(d0.getTime()-start);
    //
    return FFTUtils.crop(convolutedSpectrum, radix2Sized.rows, radix2Sized.cols, nRows, nCols);
}

function convolutionDirect(input, kernel, opt) {
    var options = Object.assign({}, {normalize : false, divisor : 1}, opt);
    var divisor = options.divisor;
    var kHeight =  kernel.length;
    var kWidth =  kernel[0].length;
    var i, j, x, y, index, sum, kVal, row, col;
    if (options.normalize) {
        divisor = 0;
        for (i = 0; i < kHeight; i++)
            for (j = 0; j < kWidth; j++)
                divisor += kernel[i][j];
    }

    if (divisor === 0) {
        throw new RangeError('convolution: The divisor is equal to zero');
    }

    var inputData = input;
    var nRows, nCols;
    if (typeof input[0] != "number") {
        nRows = input.length;
        nCols = input[0].length;
        inputData = new Array(nRows * nCols);
        for (var i = 0; i < nRows; i++) {
            for (var j = 0; j < nCols; j++) {
                inputData[i * nCols + j] = input[i][j];
            }
        }
    }

    else {
        nRows = options.rows;
        nCols = options.cols;
        if (!nRows || !nCols) {
            throw new Error("Invalid number of rows or columns " + nRows + " " + nCols);
        }
    }

    var output = new Array(nRows*nCols);

    var hHeight = Math.floor(kHeight/2);
    var hWidth = Math.floor(kWidth/2);

    for (y = 0; y < nRows; y++) {
        for (x = 0; x < nCols; x++) {
            sum = 0;
            for ( j = 0; j < kHeight; j++) {
                for ( i = 0; i < kWidth; i++) {
                    kVal = kernel[kHeight - j - 1][kWidth - i - 1];
                    //console.log(kVal)
                    row = (y + j -hHeight);// + nRows)% nRows;
                    col = (x + i - hWidth);// + nCols)% nCols;
                    if(row>=0&&col>=0&&row<nRows&&col<nCols){
                        index = (row * nCols + col);
                        sum += inputData[index] * kVal;
                    }
                    //Periodic convolution
                    /*
                    row = (y + j -hHeight + nRows)% nRows;
                    col = (x + i - hWidth + nCols)% nCols;
                    index = (row * nCols + col);
                    sum += inputData[index] * kVal;*/
                }
            }
            index = (y * nCols + x);
            output[index]= sum / divisor;
        }
    }
    return output;
}

module.exports = {
    fft:convolutionFFT,
    direct:convolutionDirect
};