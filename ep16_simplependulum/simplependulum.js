var width, height;

var pendulumCtx;

//Acceleration due to gravity.
var g = 9.80665;

var pivotPoint;
var bobRadius = 40;

var numberOfPendulums = 2;

var fulcrumLength = new Array(numberOfPendulums);
var theta = new Array(numberOfPendulums);
var bobLocation = new Array(numberOfPendulums);
var velocity = new Array(numberOfPendulums);
var colors = new Array(numberOfPendulums);

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

    var startFulcrumLength = width/2;
    bobRadius = width / 15;
    for(var i=0; i<numberOfPendulums; i++) {
        fulcrumLength[i] = startFulcrumLength;
        theta[i] = 45;
        bobLocation[i] = new Point(0, 0);
        velocity[i] = 0;

        var r = parseInt( randomBetween(75, 200) );
        var g = parseInt( randomBetween(75, 200) );
        var b = parseInt( randomBetween(75, 200) );
        colors[i] = "#" + toHex(r) + toHex(g) + toHex(b);

        startFulcrumLength += 100;
    }

    drawPendulums();
}

function update(idx) {
    bobLocation[idx].x = Math.sin(theta[idx]) * fulcrumLength[idx] + pivotPoint.x;
    bobLocation[idx].y = Math.cos(theta[idx]) * fulcrumLength[idx] + pivotPoint.y;

    var acclr = -g / fulcrumLength[idx] * Math.sin(theta[idx]);
    velocity[idx] += acclr;
    theta[idx] += velocity[idx];

    velocity[idx] *= 0.999;
}

function drawPendulums() {
    //Clear the canvas
    pendulumCtx.fillStyle = "#FFFFFF";
    pendulumCtx.beginPath();
    pendulumCtx.rect(0, 0, width, height);
    pendulumCtx.fill();

    for(var i=0; i<numberOfPendulums; i++) {
        update(i);

        pendulumCtx.strokeStyle = colors[i];
        pendulumCtx.beginPath();
        pendulumCtx.moveTo(pivotPoint.x, pivotPoint.y);
        pendulumCtx.lineTo(bobLocation[i].x, bobLocation[i].y);
        pendulumCtx.stroke();

        pendulumCtx.fillStyle = colors[i];
        pendulumCtx.beginPath();
        pendulumCtx.arc(bobLocation[i].x, bobLocation[i].y, bobRadius, 0, Math.PI*2, true);
        pendulumCtx.fill();
    }

    setTimeout(drawPendulums, 25);
}
