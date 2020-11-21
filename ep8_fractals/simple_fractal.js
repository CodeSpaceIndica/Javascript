var width, height;

var sfCtx;

var angle = 60;//Degrees
var radians = angle * Math.PI / 180;
var lineLength = 100;

var startX, startY;

//F - Draw a Line
//+ - Change the angle be positive n radians
//- - Change the angle be negative n radians

var replacer = "F+F--F+F";
var initialString = "F--F--F";
var drawString = initialString;

function drawFractal() {
    sfCtx.clearRect(0, 0, width, height);

    sfCtx.save();
    sfCtx.translate(startX, startY);

    var r = randomBetween(0, 200);
    var g = randomBetween(0, 200);
    var b = randomBetween(0, 200);
    for(var i=0; i<drawString.length; i++) {
        var aChar = drawString.charAt(i);
        if( aChar == 'F' ) {
            sfCtx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
            sfCtx.beginPath();
            sfCtx.moveTo(0, 0);
            sfCtx.lineTo(lineLength, 0);
            sfCtx.stroke();
            sfCtx.translate(lineLength, 0);

            r+=2;
            r = r > 255 ? 0 : r;
            g+=2;
            g = g > 255 ? 0 : g;
            b+=2;
            b = b > 255 ? 0 : b;
        }
        else if( aChar == '+' ) {
            sfCtx.rotate(radians);
        }
        else if (aChar == '-') {
            sfCtx.rotate(-radians);
        }
    }

    sfCtx.restore();

    drawString = drawString.replace(/F/g, replacer);
    lineLength = lineLength/2.8;
    if( lineLength < 2 ) {
        lineLength = width / 2;
        drawString = initialString;
    }
    
    setTimeout(drawFractal, 1000);
}

function init() {
    var aCanvas = document.getElementById("simpleFractalCanvas");
    sfCtx = aCanvas.getContext("2d");

    width = aCanvas.width;
    height = aCanvas.height;

    lineLength = width / 2;
    sfCtx.lineWidth = 3;

    startX = 200;
    startY = height-200;

    drawFractal();
}