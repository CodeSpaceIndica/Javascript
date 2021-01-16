var width, height;

var pendulumCtx;

//Acceleration due to gravity.
var g = 9.80665;

var pivotPoint;
var fulcrumLength = 400;
var bobRadius = 40;
var theta = 45;
var bobLocation;
var velocity = 0;

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("pendulumCanvas");
    resizeCanvas(canvasElement, false);

    pendulumCtx = canvasElement.getContext("2d");

    pendulumCtx.lineWidth = "2.0";

    width = canvasElement.width;
    height = canvasElement.height;

    pivotPoint = new Point(width/2, 10);
    bobLocation = new Point(0, 0);

    drawPendulum();
}

function update() {
    bobLocation.x = Math.sin(theta) * fulcrumLength + pivotPoint.x;
    bobLocation.y = Math.cos(theta) * fulcrumLength + pivotPoint.y;

    var acclr = -g / fulcrumLength * Math.sin(theta);
    velocity += acclr;
    theta += velocity;

    velocity *= 0.99;
}

function drawPendulum() {
    update();

    pendulumCtx.clearRect(0, 0, width, height);

    pendulumCtx.beginPath();
    pendulumCtx.moveTo(pivotPoint.x, pivotPoint.y);
    pendulumCtx.lineTo(bobLocation.x, bobLocation.y);
    pendulumCtx.stroke();

    pendulumCtx.beginPath();
    pendulumCtx.arc(bobLocation.x, bobLocation.y, bobRadius, 0, Math.PI*2, true);
    pendulumCtx.fill();

    setTimeout(drawPendulum, 25);
}
