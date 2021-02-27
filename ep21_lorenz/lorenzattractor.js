var width, height;

var lCtx;

var a = 28;
var b = 10;
var c = 8.0 / 3.0;

var x = 0.01, y = 0, z = 0;
var dt = 0.01;

var backCanvas, bCtx;

var pX, pY;

var hue = 0;

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("lCanvas");
    resizeCanvas(canvasElement, false);

    lCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    backCanvas = document.createElement("canvas");
    backCanvas.width = width;
    backCanvas.height = height;
    bCtx = backCanvas.getContext("2d");
    bCtx.fillStyle = "#000000";
    bCtx.beginPath();
    bCtx.rect(0, 0, width, height);
    bCtx.fill();

    pX = map(x, -30, 30, 0, width);
    pY = map(y, -30, 30, 0, height);

    bCtx.lineWidth = 2.0;
    bCtx.strokeStyle = "#ff0000";
    lCtx.fillStyle = "#ffffff";

    lorentz();
}

function lorentz() {
    lCtx.drawImage(backCanvas, 0, 0);

    let dx = b * (y - x) * dt;
    let dy = (x * (a - z) - y) * dt;
    let dz = (x * y - c * z) * dt;

    x += dx;
    y += dy;
    z += dz;

    let xMap = map(x, -30, 30, 0, width);
    let yMap = map(y, -30, 30, 0, height);

    bCtx.strokeStyle = "hsl(" + hue + ",100%,50%)";
    bCtx.beginPath();
    bCtx.moveTo(xMap, yMap);
    bCtx.lineTo(pX, pY);
    bCtx.stroke();

    lCtx.beginPath();
    lCtx.arc(xMap, yMap, 4, 0, Constants.TWO_PI, true);
    lCtx.fill();

    pX = xMap;
    pY = yMap;

    hue++;

    requestAnimationFrame(lorentz);
}