//CONSTANTS
const MINMAX = 3;

var width = 800;
var height = 800;

var canvasContext;
var imageData, pixelData;

var arb = 0.1;

function colorDomain() {
    for(var x=0; x<width; x++) {
        for(var y=0; y<height; y++) {
            var a = map(x, 0, width, -MINMAX, MINMAX);
            var b = map(y, 0, height, -MINMAX, MINMAX);

            //f(z) -> z
            var real = a;
            var imag = b;

            //f(z) -> z^z
            //(a+ib) ^ 2
            //(a*a - b*b) + 2*a*b
            // var real = (a*a - b*b);
            // var imag = 2*a*b;

            //z^3 - 1
            // var real = Math.pow(a, 3) - Math.pow(b, 3);
            // var imag = 3*a*a*b - 3*a*b*b - arb;

            //1/z
            // var real = 1/a;
            // var imag = 1/b;

            var hue = (Math.PI - Math.atan2(real, imag)) / (2 * Math.PI);

            var theClr = HSLtoRGB(hue, 1, 0.5);

            var px = (x + y * width) * 4;
            pixelData[px+0] = theClr[0];
            pixelData[px+1] = theClr[1];
            pixelData[px+2] = theClr[2];
            pixelData[px+3] = 255;
        }
    }
    arb += 2;
    canvasContext.putImageData(imageData, 0, 0);

    requestAnimationFrame(colorDomain);
}

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("domainColorCanvas");
    canvasContext = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    imageData = canvasContext.createImageData(width, height);
    pixelData = imageData.data;

    colorDomain();
}
