//CONSTANTS
const MAX_RADIUS = 15;
const NUM_POINTS = 350;
const DEPTH = 800;
const GLOBE_RADIUS = 250;

var width, height;
var xCenter, yCenter;

var aCtx;

var points = new Array(NUM_POINTS);

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    aCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;
    xCenter = width/2;
    yCenter = height/2;

    for(let i=0; i<NUM_POINTS; i++) {
        points[i] = new ThreeDPoint();
    }

    projection();
}

function projection() {
    aCtx.fillStyle = "#000000";
    aCtx.rect(0, 0, width, height);
    aCtx.fill();

    points.sort((point1, point2) => {
        return point1.scaleProjected - point2.scaleProjected;
    });

    for(let i=0; i<NUM_POINTS; i++) {
        // points[i].z--;
        // if( points[i].z > 0 ) {
        //     points[i].update();
        //     points[i].draw(aCtx);
        // }
        // else {
        //     points[i].draw(aCtx);
        // }
        points[i].update();
        points[i].draw(aCtx);
    }

    requestAnimationFrame(projection);
}