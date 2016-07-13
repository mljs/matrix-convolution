/**
 * Created by acastillo on 7/12/16.
 */
//var Benchmark = require('benchmark');
var convolution = require("../src/index");
//var suite = new Benchmark.Suite;

var ns = [256,300,512,600,1024];
var nks = [3,5,11,19,27,33,37];

var timesNormal = new Array(ns.length);
var timesFFT = new Array(ns.length);

for(var ni=0;ni<ns.length;ni++){
    console.log("Matrix rows "+ni);
    timesNormal[ni]=new Array(nks.length);
    timesFFT[ni]=new Array(nks.length);

    for(var nki=nks.length-1;nki>=0;nki--){
        var n=ns[ni];
        var data = new Array(n*n);//Uint32Array(n*n);
        for(var i=0;i<n;i++){
            for(var j=0;j<n;j++){
                data[i*n+j]=i+j;
            }
        }

        var kn = nks[nki];
        var kernel = new Array(kn);
        for(var i=0;i<kn;i++){
            kernel[i]=new Array(kn);
            for(var j=0;j<kn;j++){
                kernel[i][j]=i+j;
            }
        }

        var d = new Date();
        var start = d.getTime();
        var result1 = convolution.direct(data, kernel, {rows:n,cols:n});
        var d0 = new Date();
        timesNormal[ni][nki]=(d0.getTime()-start);
        var d2 = new Date();
        start = d2.getTime();
        var result2 = convolution.fft(data, kernel, {rows:n,cols:n});
        var d3 = new Date();
        timesFFT[ni][nki]=(d3.getTime()-start);
    }
}

console.log("Rows: Matrix size h/w "+ns.join(","));
console.log("Columns: Filter size h/w "+nks.join(","));
console.log("Normal");
console.log(timesNormal);
console.log("FFT");
console.log(timesFFT);
/*
// add tests
suite.add('RegExp#test', function() {
    /o/.test('Hello World!');
})
    .add('String#indexOf', function() {
        'Hello World!'.indexOf('o') > -1;
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
*/