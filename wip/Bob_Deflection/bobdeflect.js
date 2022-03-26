//CONSTANTS
const NUM_PARTICLES = 1;
const PARTICLE_SIZE = 40;
const SNAP_DISTANCE = 7;
const SNAP_DISTANCE_SQRD = SNAP_DISTANCE * SNAP_DISTANCE;

//GLOBALS
var ctx;
var width, height;
var deflectionDistance, deflectionDistanceSqrd;

var particlePoint, particleAnchor;

var mouseX, mouseY;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    let aCanvas = document.getElementById("aCanvas");
    resizeCanvas(aCanvas, false);

    ctx = aCanvas.getContext("2d");

    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    width = aCanvas.width;
    height = aCanvas.height;

    deflectionDistance = width / 5;
    deflectionDistanceSqrd = deflectionDistance * deflectionDistance;

    let x = width/2;
    let y = height/2;
    particlePoint = new Point(x, y);
    particleAnchor = particlePoint.clone();

    aCanvas.addEventListener("mousemove", function(event) {
        let mLoc = getRealMousePosition(event, aCanvas);
        mouseX = mLoc.x;
        mouseY = mLoc.y;
    });

    deflection();
});

function deflection() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let dist = getDistanceNoSqrt(particlePoint.x, particlePoint.y, mouseX, mouseY);
    if( dist < deflectionDistanceSqrd ) {
        //Remember angle is in radians
        let angle = getAngle(mouseX, mouseY, particlePoint.x, particlePoint.y);
        angle -= Math.PI;
        particlePoint.x = Math.cos(angle)*deflectionDistance + mouseX;
        particlePoint.y = Math.sin(angle)*deflectionDistance + mouseY;
    }

    if( !particlePoint.equals(particleAnchor) ) {
        let dst = getDistanceNoSqrt(particlePoint.x, particlePoint.y, 
            particleAnchor.x, particleAnchor.y);
        let speed = dst / 10;
        let norm = speed / dst;
        let dX = (particleAnchor.x - particlePoint.x) * norm;
        let dY = (particleAnchor.y - particlePoint.y) * norm;
        particlePoint.x += dX;
        particlePoint.y += dY;
        if( dst < SNAP_DISTANCE_SQRD ) {
            particlePoint.x = particleAnchor.x;
            particlePoint.y = particleAnchor.y;
        }
    }

    ctx.fillStyle = "#999999";
    ctx.beginPath();
    ctx.arc(particleAnchor.x, particleAnchor.y, PARTICLE_SIZE, 0, Constants.TWO_PI, false);
    ctx.fill();

    ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(particleAnchor.x, particleAnchor.y);
    ctx.lineTo(particlePoint.x, particlePoint.y);
    ctx.stroke();

    ctx.fillStyle = "rgba(200, 200, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(particlePoint.x, particlePoint.y, PARTICLE_SIZE, 0, Constants.TWO_PI, false);
    ctx.fill();

    requestAnimationFrame(deflection);
}