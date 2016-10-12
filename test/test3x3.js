'use strict;'

var convolution = require("../");

var rows = 3;
var cols = 3;
var matrix = new Array(rows);

for(var i=0;i<rows;i++) {
    matrix[i] = new Array(cols);
    for (var j = 0; j < cols; j++) {
        matrix[i][j]=1;
    }
}

var kerne11 = [[1,1,1],[1,1,1],[1,1,1]];
var conv = convolution.fft(matrix, kerne11);
//console.log(conv);