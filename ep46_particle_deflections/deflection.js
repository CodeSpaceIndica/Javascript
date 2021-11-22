//CONSTANTS
const CANVAS_PADDING = 30;
const NUM_PARTICLES = 90;
const PARTICLE_SIZE = 2;
const DEFLECTION_DISTANCE = 100;
const SNAP_DISTANCE = 7;
const DEFLECTION_DISTANCE_SQRD = DEFLECTION_DISTANCE * DEFLECTION_DISTANCE;
const SNAP_DISTANCE_SQRD = SNAP_DISTANCE * SNAP_DISTANCE;

//GLOBALS
var ctx;
var width, height;
var deflectionDistance, deflectionDistanceSqrd;

var particlePoints = new Array();
var particleAnchors = new Array();

var mouseX, mouseY;

//a wandering point across the canvas
var wanderer, wSpeed;

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

    deflectionDistance = width / 6;
    deflectionDistanceSqrd = deflectionDistance * deflectionDistance;

    wanderer = new Point(randomBetween(10, width-10), randomBetween(10, height-10));
    wSpeed = new Point(randomBetween(-2, 2), randomBetween(-2, 2));

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

    ctx.fillStyle = "#33E133";
    ctx.beginPath();
    ctx.arc(wanderer.x, wanderer.y, 5, 0, Constants.TWO_PI, false);
    ctx.fill();

    ctx.fillStyle = "#E1E1FF";
    for(let i=0; i<particlePoints.length; i++) {
        let aPnt = particlePoints[i];

        let dist = getDistanceNoSqrt(aPnt.x, aPnt.y, mouseX, mouseY);
        if( dist < deflectionDistanceSqrd ) {
            //Remember angle is in radians
            let angle = getAngle(mouseX, mouseY, aPnt.x, aPnt.y);
            angle -= Math.PI;
            aPnt.x = Math.cos(angle)*deflectionDistance + mouseX;
            aPnt.y = Math.sin(angle)*deflectionDistance + mouseY;
        }
        dist = getDistanceNoSqrt(aPnt.x, aPnt.y, wanderer.x, wanderer.y);
        if( dist < deflectionDistanceSqrd ) {
            //Remember angle is in radians
            let angle = getAngle(wanderer.x, wanderer.y, aPnt.x, aPnt.y);
            angle -= Math.PI;
            aPnt.x = Math.cos(angle)*deflectionDistance + wanderer.x;
            aPnt.y = Math.sin(angle)*deflectionDistance + wanderer.y;
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

        ctx.beginPath();
        //ctx.arc(aPnt.x, aPnt.y, PARTICLE_SIZE, 0, Constants.TWO_PI, false);
        //Rectangles are SO much more efficient than arcs.
        ctx.rect(aPnt.x, aPnt.y, PARTICLE_SIZE, PARTICLE_SIZE);
        ctx.fill();
    }

    wanderer.x += wSpeed.x;
    if( wanderer.x > width-5 || wanderer.x < 5 ) {
        wSpeed.x *= -1;
    }
    wanderer.y += wSpeed.y;
    if( wanderer.y > height-5 || wanderer.y < 5 ) {
        wSpeed.y *= -1;
    }
    let r = randomBetween(-0.2, 0.2);
    wSpeed.x += r;
    r = randomBetween(-0.2, 0.2);
    wSpeed.y += r;

    requestAnimationFrame(deflection);
}