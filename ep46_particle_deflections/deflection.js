//CONSTANTS
const CANVAS_PADDING = 30;
const NUM_PARTICLES = 120;
const PARTICLE_SIZE = 2;
const DEFLECTION_DISTANCE = 100;
const SNAP_DISTANCE = 7;
const DEFLECTION_DISTANCE_SQRD = DEFLECTION_DISTANCE * DEFLECTION_DISTANCE;
const SNAP_DISTANCE_SQRD = SNAP_DISTANCE * SNAP_DISTANCE;

//GLOBALS
var ctx;
var width, height;

var particlePoints = new Array();
var particleAnchors = new Array();

var mouseX, mouseY;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    let aCanvas = document.getElementById("aCanvas");
    resizeCanvas(aCanvas, false);

    ctx = aCanvas.getContext("2d");

    width = aCanvas.width;
    height = aCanvas.height;

    let x = CANVAS_PADDING;
    let y = CANVAS_PADDING;
    let iX = (width - (CANVAS_PADDING * 2)) / NUM_PARTICLES;
    let iY = (height - (CANVAS_PADDING * 2)) / NUM_PARTICLES;
    for(let i=0; i<NUM_PARTICLES; i++) {
        for(let j=0; j<NUM_PARTICLES; j++) {
            let particlePoint = new Point(x, y);
            particlePoints.push(particlePoint);
            particleAnchors.push(particlePoint.clone());

            x+= iX;
        }
        x = CANVAS_PADDING;
        y += iY;
    }

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

    ctx.fillStyle = "#E1E1FF";
    for(let i=0; i<particlePoints.length; i++) {
        let aPnt = particlePoints[i];

        let dist = getDistanceNoSqrt(aPnt.x, aPnt.y, mouseX, mouseY);
        if( dist < DEFLECTION_DISTANCE_SQRD ) {
            //Remember angle is in radians
            let angle = getAngle(mouseX, mouseY, aPnt.x, aPnt.y);
            angle -= Math.PI;
            aPnt.x = Math.cos(angle)*DEFLECTION_DISTANCE + mouseX;
            aPnt.y = Math.sin(angle)*DEFLECTION_DISTANCE + mouseY;
        }

        if( !aPnt.equals(particleAnchors[i]) ) {
            let dst = getDistanceNoSqrt(aPnt.x, aPnt.y, 
                particleAnchors[i].x, particleAnchors[i].y);
            let speed = dst / 10;
            let norm = speed / dst;
            let dX = (particleAnchors[i].x - aPnt.x) * norm;
            let dY = (particleAnchors[i].y - aPnt.y) * norm;
            aPnt.x += dX;
            aPnt.y += dY;
            if( dst < SNAP_DISTANCE_SQRD ) {
                aPnt.x = particleAnchors[i].x;
                aPnt.y = particleAnchors[i].y;
            }
        }

        //OH MY GOD RECTANGLES ARE SO MUCH MORE EFFICIENT.
        ctx.beginPath();
        //ctx.arc(aPnt.x, aPnt.y, PARTICLE_SIZE, 0, Constants.TWO_PI, false);
        ctx.rect(aPnt.x, aPnt.y, 2, 2);
        ctx.fill();
    }

    requestAnimationFrame(deflection);
}