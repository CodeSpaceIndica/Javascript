//CONSTANTS
const G = 3;
const DAMPING = 0.999;
const TWO_PI = Math.PI * 2;
const NUM_PENDULUMS = 7;

var width, height;

var ncCtx;

var pendulums = new Array(NUM_PENDULUMS);

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("ncCanvas");
    resizeCanvas(canvasElement, false);

    ncCtx = canvasElement.getContext("2d");

    ncCtx.lineWidth = "2.0";

    width = canvasElement.width;
    height = canvasElement.height;

    let pendulumHeight = height/2;
    let mass = 8;
    //Make the bob radius proportional to the size of the canvas.
    let bobRadius = mass * width / 200;
    let startX = (width/2) - (((bobRadius*2)*NUM_PENDULUMS)/2);
    startX += bobRadius;

    let hue = 0;
    let incrHue = 1 / NUM_PENDULUMS;
    for(let i=0; i<NUM_PENDULUMS; i++) {
        let rgb = HSLtoRGB(hue, 0.8, 0.5);
        let rgbClr = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
        let pivotPoint = new Point(startX, 10);

        pendulums[i] = new Bob(pivotPoint, mass, 0, pendulumHeight, rgbClr);
        pendulums[i].updateLocation();

        startX += bobRadius*2;
        hue += incrHue;
    }

    pendulums[0].theta = -1;
    pendulums[1].theta = -1;

    drawCradle();
}

function drawCradle() {
    //Leave a trail behind.
    ncCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ncCtx.beginPath();
    ncCtx.rect(0, 0, width, height);
    ncCtx.fill();

    for(let i=0; i<NUM_PENDULUMS; i++) {
        pendulums[i].update();
        pendulums[i].render(ncCtx);
    }

    for(let i=0; i<NUM_PENDULUMS; i++) {
        if( i < NUM_PENDULUMS-1 ) {
            var nextPendulum = pendulums[i+1];
            checkCollision(pendulums[i], nextPendulum);
        }
        if( i > 0 ) {
            var prevPendulum = pendulums[i-1];
            checkCollision(pendulums[i], prevPendulum);
        }
    }

    requestAnimationFrame(drawCradle);
}

function checkCollision(bob1, bob2) {
    let dist = getDistance(bob1.location.x, bob1.location.y, bob2.location.x, bob2.location.y);
    if( dist < bob1.radius+bob2.radius ) {
        let m1 = bob1.mass;
        let m2 = bob2.mass;

        //We need linear velocity BEFORE collision
        let v1 = bob1.velocity * bob1.fulcrumLength;
        let v2 = bob2.velocity * bob2.fulcrumLength;

        //console.log(Math.abs(v1-v2).toFixed(2));

        //If the difference between the velocities
        // is below a specific threshold, 
        //then don't calculate anything.
        if( Math.abs(v1-v2) < G ) {
            return;
        }

        //Linear Velocities AFTER collision
        // let v1Prime = ( v1 * (m1 - m2) + (2*m2*v2) ) / (m1 + m2);
        // let v2Prime = ( v2 * (m2 - m1) + (2*m1*v1) ) / (m1 + m2);

        //Because both masses are the same we can leave out the 
        //first part of the equation.
        let v1Prime = (2*m2*v2) / (m1 + m2);
        let v2Prime = (2*m1*v1) / (m1 + m2);

        bob1.velocity = v1Prime / bob1.fulcrumLength;
        bob2.velocity = v2Prime / bob2.fulcrumLength;

        if( bob1.velocity == 0 ) {
            bob1.theta = 0;
        }
        bob1.theta += bob1.velocity;
        bob1.updateLocation();

        if( bob2.velocity == 0 ) {
            bob2.theta = 0;
        }
        bob2.theta += bob2.velocity;
        bob2.updateLocation();
    }
}