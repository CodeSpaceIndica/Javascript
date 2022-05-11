const DEPTH = 400;

var goCanvas, goCtx;
var bgCanvas;

var numStarsSTR=200;

var xSTR = new Array();
var ySTR = new Array();
var zSTR = new Array();
var xCenter, yCenter;

var goText = "";
var tX, tY;

function initGOCanvas() {
    goCanvas = document.createElement("canvas");
    goCanvas.width = width;
    goCanvas.height = height;
    goCtx = goCanvas.getContext("2d");
    let fontSize = width / 10;
    goCtx.font = fontSize + "px Monospace";

    xCenter = width/2;
    yCenter = height/2;
    goCtx.translate(xCenter, yCenter);
}

function gameOver() {
	for(var i=0; i<numStarsSTR; i++) {
        xSTR[i] = randomBetween(-xCenter+50, xCenter-50);
        ySTR[i] = randomBetween(-yCenter+50, yCenter-50);
        zSTR[i] = randomBetween(0, DEPTH);
    }

    bgCanvas = document.createElement("canvas");
    bgCanvas.width = width;
    bgCanvas.height = height;
    let bgCtx = bgCanvas.getContext("2d");
    bgCtx.drawImage(canvasElement, 0, 0);

    if( isWon ) {
        goText = "You won!";
    }
    else {
        goText = "You lost";
    }

    let textMtr = goCtx.measureText(goText);
    tX = -textMtr.width/2;
    tY = (textMtr.fontBoundingBoxAscent+textMtr.fontBoundingBoxDescent)/2;

    animateGameOver();
}

function animateGameOver() {
    if( !isGameOver ) {
        return;
    }
    goCtx.drawImage(bgCanvas, -xCenter, -yCenter);

    for(var i=0; i<numStarsSTR; i++) {
        if( isWon ) {
            zSTR[i] -= 5;
        }
        else {
            zSTR[i] += 5;
        }
        if(zSTR[i] < -DEPTH || zSTR[i] > DEPTH ) {
            xSTR[i] = randomBetween(-xCenter+50, xCenter-50);
            ySTR[i] = randomBetween(-yCenter+50, yCenter-50);
            zSTR[i] = randomBetween(0, DEPTH);
        }
        let projected = DEPTH / (DEPTH + zSTR[i]);

        let xProj = (xSTR[i] * projected);
        let yProj = (ySTR[i] * projected);

        let size = map(zSTR[i], 0, DEPTH, 7, 0);

        goCtx.fillStyle = "#333333";
        goCtx.beginPath();
        goCtx.rect(xProj, yProj, size, size );
        goCtx.fill();
    }

    goCtx.shadowColor = "#000000";
    goCtx.shadowBlur = 10;
    goCtx.lineWidth = 5;
    goCtx.strokeText(goText, tX, tY);
    goCtx.shadowBlur = 0;
    if( isWon ) {
        goCtx.fillStyle = "#CCFFCC";
    }
    else {
        goCtx.fillStyle = "#FFCCCC";
    }
    goCtx.fillText(goText, tX, tY);

    ctx.drawImage(goCanvas, 0, 0);

    requestAnimationFrame(animateGameOver);
}
