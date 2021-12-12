var width, height;

var ctx;

var minVelocity = -3;
var maxVelocity = 3;
var allBoids = new Array();
var boidSize = 20;

var boidCount = 300;

var alignmentDistance  = 100;     //Adjustable
var cohesionDistance   = 70;     //Adjustable
var separationDistance = 25;     //Adjustable

var initCtr = 0;
var initR, initG, initB, clr;
var rX, rY, iX, iY;

/**
 * Initialize animation.
 */
function init() {
    //Init the canvas
    let canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    // for(let c=0; c<boidCount; c++) {
    //     var randomStartingX = randomBetween(10, width-10);
    //     var randomStartingY = randomBetween(10, height-10);
    //     var iX = randomBetween(-1, 1);
    //     var iY = randomBetween(-1, 1);

    //     var aBoid = new Boid(randomStartingX, randomStartingY, iX, iY);
    //     allBoids.push( aBoid );
    // }

    initBoids();

    flocking();
}

function initBoids() {
    if( initCtr % 100 == 0 ) {
        initR = parseInt(randomBetween(50, 255));
        initG = parseInt(randomBetween(50, 255));
        initB = parseInt(randomBetween(50, 255));
        clr   = "rgb(" + initR + "," + initG + "," + initB + ")";

        rX = randomBetween(10, width-10);
        rY = randomBetween(10, height-10);
    }

    iX = randomBetween(-1, 1);
    iY = randomBetween(-1, 1);
    var aBoid = new Boid(rX, rY, iX, iY, clr);
    allBoids.push( aBoid );

    initCtr++;
    if( initCtr > boidCount ) {
        return;
    }

    setTimeout(initBoids, 10);
}

/**
 * Loop function
 */
function flocking() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    //Loop thru all boids and adjust their speeds.
    allBoids.forEach(boid => {
        var alignSpeedAdj = doAlignment(boid);
        boid.addSpeed(alignSpeedAdj);

        var cohesSpeedAdj = doCohesion(boid);
        boid.addSpeed(cohesSpeedAdj);

        var separSpeedAdj = doSeparation(boid);
        boid.addSpeed(separSpeedAdj);

        boid.update();
        boid.render(ctx);
    });

    requestAnimationFrame(flocking);
}

/**
 * Alignment.
 * How it works: Find all other boids that are within the radius of "alignmentDistance".
 * Find the average speed of these other boids and normalize these average to a value between 
 * 0.1 and 1.0.
 * 
 * @param {*} bIndex Index of boid that needs to be aligned
 */
 function doAlignment(aBoid) {
    let countOfNeighbours = 0;
    let totalSpeedX = 0;
    let totalSpeedY = 0;
    let alignmentSpeed = new Point(0, 0);

    allBoids.forEach(boid => {
        if( aBoid != boid && getDistance(aBoid.x, aBoid.y, boid.x, boid.y) < alignmentDistance ) {
            totalSpeedX += boid.speedX;
            totalSpeedY += boid.speedY;
            countOfNeighbours++;
        }
    });

    if( countOfNeighbours > 0 ) {
        let avgX = totalSpeedX / countOfNeighbours;
        let avgY = totalSpeedY / countOfNeighbours;
        let normalX = (avgX - minVelocity) / (maxVelocity - minVelocity);
        let normalY = (avgY - minVelocity) / (maxVelocity - minVelocity);
        normalX /= 100;
        normalY /= 100;
        alignmentSpeed = new Point(normalX, normalY);
    }

    return alignmentSpeed;
}

/**
 * Cohesion
 * How it works: Find all boids within a "cohesionDistance" then find the average of their positions.
 * Normalize the resulting average to a value beween 0.1 and 1.0 and adjust boids position.
 * 
 * @param {*} bIndex Index of boid that needs to be cohesed.(don't know if that's a word)
 */
function doCohesion(aBoid) {
    let countOfNeighbours = 0;
    let totalX = 0;
    let totalY = 0;
    let cohesionSpeed = new Point(0, 0);
    allBoids.forEach(boid => {
        if( aBoid != boid && getDistance(aBoid.x, aBoid.y, boid.x, boid.y) < cohesionDistance ) {            
            totalX += boid.x;
            totalY += boid.y;
            countOfNeighbours++;
        }
    });

    if( countOfNeighbours > 0 ) {
        let avgX = totalX / countOfNeighbours;
        let avgY = totalY / countOfNeighbours;
        let normalX = avgX - aBoid.x;
        let normalY = avgY - aBoid.y;
        normalX /= 100;
        normalY /= 100;
        cohesionSpeed = new Point(normalX, normalY);
    }

    return cohesionSpeed;
}

/**
 * Separation
 * How it works: Find the average position of the boids within a radius of "separationDistance".
 * The normalize the value between 0.1 and 1.0.
 * 
 * @param {*} bIndex Index of boid that needs to be separated.
 */
function doSeparation(aBoid) {
    let countOfNeighbours = 0;
    let sepX = 0;
    let sepY = 0;
    let separationSpeed = new Point(0, 0);
    allBoids.forEach(boid => {
        if( aBoid != boid && getDistance(aBoid.x, aBoid.y, boid.x, boid.y) < separationDistance ) {
            sepX -= boid.x - aBoid.x;
            sepY -= boid.y - aBoid.y;
            countOfNeighbours++;
        }
    });

    if( countOfNeighbours > 0 ) {
        sepX /= 70;
        sepY /= 70;
        separationSpeed = new Point(sepX, sepY);
    }

    return separationSpeed;
}
