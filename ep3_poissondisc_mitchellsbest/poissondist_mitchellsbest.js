
const WIDTH = 400;
const HEIGHT = 400;

const NUM_POINTS = 7000;

const TWO_PI = Math.PI*2;

const NUM_SAMPLES = 10;

var anImage = new Image();

var ordCtx;
var randCtx;
var mbstCtx;

var activeCandidateX = [];
var activeCandidateY = [];

function orderedPoints() {
    var gap = 6;
    for(var i=0; i<WIDTH; i += gap) {
        for(var j=0; j<WIDTH; j += gap) {
            ordCtx.beginPath();
            ordCtx.arc(i, j, 2, 0,TWO_PI, true);
            ordCtx.fill();
        }
    }
}

function randomPoints() {
    for(i = 0; i<NUM_POINTS; i++) {
        var rX = parseInt(Math.random() * WIDTH);
        var rY = parseInt(Math.random() * HEIGHT);

        randCtx.beginPath();
        randCtx.arc(rX, rY, 2, 0,TWO_PI, true);
        randCtx.fill();
    }
}

function mitchelsBestCandidate() {
    //Start with placing a random point first
    var rX = parseInt(Math.random() * WIDTH);
    var rY = parseInt(Math.random() * HEIGHT);
    activeCandidateX.push(rX);
    activeCandidateY.push(rY);

     for(var i=1; i<NUM_POINTS; i++) {
         var bestCandidate = getBestCandidate();
         activeCandidateX.push(bestCandidate[0]);
         activeCandidateY.push(bestCandidate[1]);
     }

    for(var i=0; i<NUM_POINTS; i++) {
        mbstCtx.beginPath();
        mbstCtx.arc(activeCandidateX[i], activeCandidateY[i], 2, 0, TWO_PI, true);
        mbstCtx.fill();
    }
}

function getBestCandidate() {
    var bestDistance = 0;
    var bestCandidateX, bestCandidateY;
    for(var i=0; i<NUM_SAMPLES; i++) {
        var candidateX = parseInt(Math.random() * WIDTH);
        var candidateY = parseInt(Math.random() * HEIGHT);
        var closestPoint = findClosestPoint(candidateX, candidateY);
        var distance = getDistance(closestPoint[0], closestPoint[1], candidateX, candidateY);
        if( distance > bestDistance ) {
            bestDistance = distance;
            bestCandidateX = candidateX;
            bestCandidateY = candidateY;
        }
    }

    return [bestCandidateX, bestCandidateY];
}

function findClosestPoint(rX, rY) {
    var closestPoint = [];
    var closestDistance = Infinity;
    for(var i=0; i<activeCandidateX.length; i++) {
        var distance = getDistance(rX, rY, activeCandidateX[i], activeCandidateY[i]);
        if( distance < closestDistance ) {
            closestDistance = distance;
            closestPoint[0] = activeCandidateX[i];
            closestPoint[1] = activeCandidateY[i];
        }
    }

    return closestPoint;
}

function getDistance(sX, sY, eX, eY) {
    return Math.abs( Math.sqrt( (eX-sX)*(eX-sX) + (eY-sY)*(eY-sY) ) );
}


function init() {
    var ordrdCanvas = document.getElementById("orderdCanvas");
    ordCtx = ordrdCanvas.getContext("2d");

    var randomCanvas = document.getElementById("randomCanvas");
    randCtx = randomCanvas.getContext("2d");

    var mitchlCanvas = document.getElementById("mitchlCanvas");
    mbstCtx = mitchlCanvas.getContext("2d");

    anImage.src = "mountains.jpg";
    anImage.onload = startDrawing;
}

function startDrawing() {
    var pattern1 = ordCtx.createPattern(anImage, "no-repeat");
    ordCtx.fillStyle = pattern1;
    orderedPoints();

    var pattern2 = randCtx.createPattern(anImage, "no-repeat");
    randCtx.fillStyle = pattern2;
    randomPoints();

    var pattern3 = mbstCtx.createPattern(anImage, "no-repeat");
    mbstCtx.fillStyle = pattern3;
    mitchelsBestCandidate();
}