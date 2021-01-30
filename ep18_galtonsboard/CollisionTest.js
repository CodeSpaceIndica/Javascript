const COEFF_RESTITUTION = 0.8;
const GRAV_FORCE = new Point(0, 0.6);
const MAX_SPEED = 8;

const NUM_PEGS = 30;
const PEG_RADIUS = 5;

const NUM_BALLS = 600;
const BALL_RADIUS = 3;
const BALL_MASS = 20;

var width, height;
var ctx;
var ctr = 0;
var bCtr = 0;

var balls = [];
var pegs = [];
var buckets = [];

function init() {
    //Init the canvas
    let canvasElement = document.getElementById("theCanvas");
    resizeCanvas(canvasElement, false);

    width = canvasElement.width;
    height = canvasElement.height;

    ctx = canvasElement.getContext("2d");

    let startY = 30;
    let ctr = 0;
    let gap = 16;
    for(let i=0; i<10; i++) {
        let pegCount = ctr % 2 == 0 ? NUM_PEGS-1 : NUM_PEGS;
        let startX = (width/2) - (pegCount*(PEG_RADIUS+gap))/2;
        for(let j=0; j<pegCount; j++) {
            var aPeg = new Peg(new Point(startX, startY), PEG_RADIUS);
            pegs.push(aPeg);

            startX += gap + PEG_RADIUS
        }
        startY += gap + PEG_RADIUS + 5;
        ctr++;
    }

    let numBuckets = NUM_PEGS;
    let bucketWidth = PEG_RADIUS + gap;
    let startX = (width/2) - (numBuckets*bucketWidth)/2;
    let bucketHeight = height-startY;
    startY = height - bucketHeight;
    for(let i=0; i<numBuckets; i++) {
        var aBucket = new Bucket(startX, startY, bucketWidth, bucketHeight);
        buckets.push(aBucket);

        startX += bucketWidth;
    }

    animate();
}

function animate() {
    //ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.rect(0, 0, width, height);
    ctx.fill();

    if( ctr % 5 == 0 ) {
        if( bCtr < NUM_BALLS ) {
            var x = width/2 - randomBetween(-BALL_RADIUS, BALL_RADIUS);
            var y = -50;
            var aBall = new Ball(new Point(x, y), BALL_RADIUS);
            balls.push(aBall);
            bCtr++
        }
    }
    ctr++;

    for(let i=0; i<pegs.length; i++) {
        pegs[i].render(ctx);
    }

    for(let i=0; i<balls.length; i++) {
        if( balls[i].isDone ) {
            continue;
        }
        balls[i].addForce(GRAV_FORCE);
        balls[i].update();
        balls[i].render(ctx);
    }

    for(let i=0; i<buckets.length; i++) {
        buckets[i].render(ctx);
    }

    for(let i=0; i<balls.length; i++) {
        if( balls[i].isDone ) {
            continue;
        }
        for(let k=0; k<pegs.length; k++) {
            let x1 = balls[i].location.x + balls[i].velocity.x;
            let y1 = balls[i].location.y + balls[i].velocity.y;

            let x2 = pegs[k].location.x;
            let y2 = pegs[k].location.y;
            let dist = getDistance(x1, y1, x2, y2);
            let checkRadius = balls[i].radius + pegs[k].radius;
            //A collision has happened.
            if( dist <= checkRadius ) {
                let tangent = Math.atan2(balls[i].location.y-pegs[k].location.y,
                    balls[i].location.x-pegs[k].location.x);
                let angle = Constants.HALF_PI / 180 + tangent;

                balls[i].location.x += Math.sin(angle);
                balls[i].location.y -= Math.cos(angle);

                collidePB(balls[i], pegs[k]);
            }
        }

        for(let j=0; j<balls.length; j++) {
            if( i == j ) {
                continue;
            }

            let x1 = balls[i].location.x + balls[i].velocity.x;
            let y1 = balls[i].location.y + balls[i].velocity.y;

            let x2 = balls[j].location.x + balls[j].velocity.x;
            let y2 = balls[j].location.y + balls[j].velocity.y;

            let dist = getDistance(x1, y1, x2, y2);
            let checkRadius = balls[i].radius + balls[j].radius;

            //A collision has happened.
            if( dist <= checkRadius ) {
                let tangent = Math.atan2(balls[i].location.y-balls[j].location.y,
                    balls[i].location.x-balls[j].location.x);
                let angle = Constants.HALF_PI / 180 + tangent;

                balls[i].location.x += Math.sin(angle);
                balls[i].location.y -= Math.cos(angle);

                balls[j].location.x -= Math.sin(angle);
                balls[j].location.y += Math.cos(angle);

                collideBB(balls[i], balls[j]);
            }
        }

        for(let l=0; l<buckets.length; l++) {
            if( balls[i].location.y+balls[i].radius >= buckets[l].y &&
                balls[i].location.x+balls[i].radius >= buckets[l].x &&
                balls[i].location.x-balls[i].radius <= buckets[l].x+buckets[l].w ) {

                if( !balls[i].isDone ) {
                    buckets[l].fillH += 5;
                    balls[i].isDone = true;
                }
            }
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Collide Ball Ball - resolution function
 */
function collideBB(aBall, bBall) {
    let x1 = aBall.location.x;
    let y1 = aBall.location.y;
    let x2 = bBall.location.x;
    let y2 = bBall.location.y;

    let vx1 = aBall.velocity.x;
    let vy1 = aBall.velocity.y;
    let vx2 = bBall.velocity.x;
    let vy2 = bBall.velocity.y;

    let m1 = BALL_MASS;
    let m2 = BALL_MASS;

    //step 1
    let xN = x2 - x1;
    let yN = y2 - y1;
    let magnitude = Math.sqrt( xN*xN + yN*yN );
    let xUnitN = 0;
    let yUnitN = 0;
    if( magnitude != 0 ) {
        xUnitN = xN / magnitude;
        yUnitN = yN / magnitude;
    }
    let xUnitT = -yUnitN;
    let yUnitT = xUnitN;

    //Step 2 is done.

    //Step 3
    let v1n = xUnitN * vx1 + yUnitN * vy1;
    let v2n = xUnitN * vx2 + yUnitN * vy2;

    let v1t = xUnitT * vx1 + yUnitT * vy1;
    let v2t = xUnitT * vx2 + yUnitT * vy2;

    //Step 4
    let v1tPrime = v1t;
    let v2tPrime = v2t;

    //Step 5
    let v1nPrime = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);
    let v2nPrime = (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2);

    v1nPrime *= COEFF_RESTITUTION;
    v2nPrime *= COEFF_RESTITUTION;

    //Step 6
    aBall.velocity.x = (v1nPrime * xUnitN) + (v1tPrime * xUnitT);
    aBall.velocity.y = (v1nPrime * yUnitN) + (v1tPrime * yUnitT);

    bBall.velocity.x = (v2nPrime * xUnitN) + (v2tPrime * xUnitT);
    bBall.velocity.y = (v2nPrime * yUnitN) + (v2tPrime * yUnitT);
}


/**
 * Collide Peg Ball - resolution function
 */
function collidePB(aBall, aPeg) {
    let x1 = aBall.location.x;
    let y1 = aBall.location.y;
    let x2 = aPeg.location.x;
    let y2 = aPeg.location.y;

    let vx1 = aBall.velocity.x;
    let vy1 = aBall.velocity.y;
    let vx2 = 0;
    let vy2 = 0;

    let m1 = BALL_MASS;
    let m2 = Number.MAX_SAFE_INTEGER;

    //step 1
    let xN = x2 - x1;
    let yN = y2 - y1;
    let magnitude = Math.sqrt( xN*xN + yN*yN );
    let xUnitN = 0;
    let yUnitN = 0;
    if( magnitude != 0 ) {
        xUnitN = xN / magnitude;
        yUnitN = yN / magnitude;
    }
    let xUnitT = -yUnitN;
    let yUnitT = xUnitN;

    //Step 2 is done.

    //Step 3
    let v1n = xUnitN * vx1 + yUnitN * vy1;
    let v2n = xUnitN * vx2 + yUnitN * vy2;

    let v1t = xUnitT * vx1 + yUnitT * vy1;

    //Step 4
    let v1tPrime = v1t;

    //Step 5
    let v1nPrime = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);

    v1nPrime *= COEFF_RESTITUTION;

    //Step 6
    aBall.velocity.x = (v1nPrime * xUnitN) + (v1tPrime * xUnitT);
    aBall.velocity.y = (v1nPrime * yUnitN) + (v1tPrime * yUnitT);
}
