//https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
const RADIUS = 5;
const DIMENSIONS = 2; //This is N
const MAX_TRIES = 30; //This is the K

var brdCtx;

var width, height

var theGrid = [];
var points = []; //OUR FINAL POINTS WILL BE HERE.
var ctr = 0;

var anImage = new Image();

function init() {
    var brdCanvas = document.getElementById("brdCanvas");
    brdCtx = brdCanvas.getContext("2d");

    width  = brdCanvas.width;
    height = brdCanvas.height;

    //STEP 0
    var cellSize = RADIUS / Math.sqrt(DIMENSIONS);
    var cellWidth = Math.ceil(width / cellSize) + 1;
    var cellHeight = Math.ceil(height / cellSize) + 1;

    for(var i=0; i<cellWidth;i++) {
        theGrid[i] = [];
        for(var j=0; j<cellHeight;j++) {
            theGrid[i][j] = undefined;
        }
    }

    var active = [];

    //STEP 1
    var rPoint = new Point(
        randomBetween(0, width),
        randomBetween(0, height)
    );
    points.push(rPoint);
    active.push(rPoint);
    insertToGrid(rPoint, cellSize);

    //STEP 2
    while( active.length > 0 ) {
        var randomIndex = parseInt( randomBetween(0, active.length) );
        var randomPoint = active[randomIndex];

        var found = false;
        for(var i=0; i<MAX_TRIES; i++) {
            var rTheta = randomBetween(0, 360);
            var randomRadius = randomBetween(RADIUS, RADIUS*2);
            var rXPoint = randomPoint.x + randomRadius * Math.cos(rTheta);
            var rYPoint = randomPoint.y + randomRadius * Math.sin(rTheta);
            var newPoint = new Point(rXPoint, rYPoint);
            if( !isPointValid(newPoint, cellWidth, cellHeight, cellSize) ) {
                continue;
            }
            found = true;
            points.push(newPoint);
            active.push(newPoint);
            insertToGrid(newPoint, cellSize);
        }

        if( !found ) {
            active.splice(randomIndex, 1);
        }
    }

    brdCtx.fillStyle = "#FFFFFF";
    brdCtx.beginPath();
    brdCtx.fillRect(0, 0, width, height);
    brdCtx.fill();

    //brdCtx.fillStyle = "#555555";

    anImage.src = "India.jpg";
    anImage.onload = function() {
        var pattern1 = brdCtx.createPattern(anImage, "repeat");
        brdCtx.fillStyle = pattern1;
        draw();
    }
}

function draw() {
    var thePoint = points[ctr];
    brdCtx.beginPath();
    brdCtx.arc(thePoint.x, thePoint.y, 2, 0, Math.PI*2, true);
    brdCtx.fill();

    ctr++;
    if( ctr > points.length ) {
        return;
    }

    setTimeout(draw, 1);
}

function insertToGrid(point, cellSize) {
    var xIndex = Math.floor(point.x / cellSize);
    var yIndex = Math.floor(point.y / cellSize);
    theGrid[xIndex][yIndex] = point;
}

function isPointValid(rPoint, cellWidth, cellHeight, cellSize) {
    //not valid If it exceeds canvas dimensions
    if( rPoint.x < 0 || rPoint.x > width || rPoint.y < 0 || rPoint.y > height ) {
        return false;
    }

    var xIndex = Math.floor(rPoint.x / cellSize);
    var yIndex = Math.floor(rPoint.y / cellSize);
    var iMin = Math.max(xIndex-1, 0);
    var iMax = Math.min(xIndex+1, cellWidth-1);
    var jMin = Math.max(yIndex-1, 0);
    var jMax = Math.min(yIndex+1, cellHeight-1);
    for(var i=iMin; i<=iMax; i++) {
        for(var j=jMin; j<=jMax; j++) {
            if( theGrid[i][j] 
                && getDistance(rPoint.x, rPoint.y, theGrid[i][j].x, theGrid[i][j].y) < RADIUS
            ) {
                return false;
            }
        }
    }


    return true;
}
