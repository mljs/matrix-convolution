'use strict;'

var convolution = require("../");

var rows = 5;
var cols = 5;
var matrix = new Array(rows);

for(var i=0;i<rows;i++) {
    matrix[i] = new Array(cols);
    for (var j = 0; j < cols; j++) {
        matrix[i][j]=1;
    }
}

var kerne11 = [[1,1,1],[1,1,1],[1,1,1]];
var kerne12 = [[1,1],[1,1]];

var result1 = [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9];
var result2 = [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];

var smallFilter = [
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 1, 3, 5, 5, 5, 3, 1, 0],
    [1, 3, 5, 3, 0, 3, 5, 3, 1],
    [2, 5, 3, -12, -23, -12, 3, 5, 2],
    [2, 5, 0, -23, -40, -23, 0, 5, 2],
    [2, 5, 3, -12, -23, -12, 3, 5, 2],
    [1, 3, 5, 3, 0, 3, 5, 3, 1],
    [0, 1, 3, 5, 5, 5, 3, 1, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0]];

describe('Direct convolution', function () {
    it('Odd number of rows and columns', function () {
        var conv = convolution.direct(matrix, kerne11);
        shouldApproximately(conv, result1, 1e-8);
    });
    it('Even number of rows and columns', function () {
        var conv = convolution.direct(matrix,kerne12);
        shouldApproximately(conv, result2, 1e-8);
    });
});
describe('FFT convolution', function () {
    it('Odd number of rows and columns', function () {
        var conv = convolution.fft(matrix, kerne11);
        shouldApproximately(conv, result1, 1e-8);

    });
    it('Even number of rows and columns', function () {
       var conv = convolution.fft(matrix,kerne12);shouldApproximately(conv, result2, 1e-8);
    });
});

describe('KernelFatory', function () {
    it('LoG', function () {
        var kernel = convolution.kernelFactory.LoG(1.4,9,{factor:40});
        kernel.should.eql(smallFilter);

    });
});

function shouldApproximately(A, B, error){
    A.length.should.eql(B.length);
    for(var i=0;i<A.length;i++){
        A[i].should.approximately(B[i],error);
    }
}