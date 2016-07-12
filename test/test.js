'use strict;'

var convolution = require("../");

var rows = 6;
var cols = 6;
var matrix = new Array(rows);

for(var i=0;i<rows;i++) {
    matrix[i] = new Array(cols);
    for (var j = 0; j < cols; j++) {
        matrix[i][j]=1;
    }
}

var kerne11 = [[1,1,1],[1,1,1],[1,1,1]];
var kerne12 = [[1,1],[1,1]];

var result1 = [4,6,6,6,6,4,6,9,9,9,9,6,6,9,9,9,9,6,6,9,9,9,9,6,6,9,9,9,9,6,4,6,6,6,6,4];
var result2 = [1,2,2,2,2,2,2,4,4,4,4,4,2,4,4,4,4,4,2,4,4,4,4,4,2,4,4,4,4,4,2,4,4,4,4,4];

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
        var conv = convolution.fft(matrix,kerne12);
        shouldApproximately(conv, result2, 1e-8);
    });
});

function shouldApproximately(A, B, error){
    A.length.should.eql(B.length);
    for(var i=0;i<A.length;i++){
        A[i].should.approximately(B[i],error);
    }
}