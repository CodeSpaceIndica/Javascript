//CONSTANTS
const NUM_SIDES = 12;
const NUM_CIRCLES = 500;

var width, height;

var kCtx;

var anImage;

var dCanvas, dCtx;
var dW, dH;
var circLocations = [];
var circSpeeds = [];
var circRadii = [];
var circClrs = [];

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("kCanvas");
    resizeCanvas(canvasElement, false);

    kCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    dCanvas = document.getElementById("dCanvas");
    dCtx = dCanvas.getContext("2d");
    dW = dCanvas.width;
    dH = dCanvas.height;
    for(let i=0; i<NUM_CIRCLES; i++) {
        let x = randomBetween(0, dW);
        let y = randomBetween(0, dH);
        circLocations.push( new Point(x, y) );

        let speed = randomBetween(0, 1);
        circSpeeds.push(speed);

        let rd = randomBetween(0, 10);
        circRadii.push(rd);

        let r = parseInt(randomBetween(50, 255));
        let g = parseInt(randomBetween(50, 255));
        let b = parseInt(randomBetween(50, 255));
        let clr = "rgb(" + r + "," + g + "," + b + ")";
        circClrs.push(clr);
    }

    anImage = new Image();
    anImage.src = "hypno.jpg";
    anImage.onload = function() {
        drawKaleido();
    }
}

function drawKaleido() {
    let angle = Constants.TWO_PI / NUM_SIDES;
    let incrAngle = angle;
    for(let i=0; i<NUM_SIDES; i++) {
        kCtx.save();
        kCtx.translate(width/2, height/2);
        kCtx.rotate(angle);
        kCtx.beginPath();
        kCtx.moveTo(0, 0);
        kCtx.arc(0, 0, width/2, 0, incrAngle, false);
        kCtx.lineTo(0, 0);
        kCtx.clip();
        //kCtx.drawImage(anImage, 0, 0);
        kCtx.drawImage(dCanvas, 0, 0);

        angle += incrAngle;

        kCtx.restore();
    }

    drawCanvas();

    requestAnimationFrame(drawKaleido);
}

function drawCanvas() {
    dCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
    dCtx.beginPath();
    dCtx.rect(0, 0, dW, dH);
    dCtx.fill();
    for(let i=0; i<NUM_CIRCLES; i++) {
        dCtx.fillStyle = circClrs[i];

        dCtx.beginPath();
        dCtx.arc(circLocations[i].x, circLocations[i].y, circRadii[i], 0, Constants.TWO_PI, true);
        dCtx.fill();

        circLocations[i].x += circSpeeds[i];
        circLocations[i].y += circSpeeds[i];
        if( circLocations[i].x > dW || circLocations[i].y > dH ) {
            let x = randomBetween(0, -200);
            let y = randomBetween(0, -200);
            circLocations[i] = new Point(x, y);
   
            let speed = randomBetween(0, 1);
            circSpeeds[i] = speed;

            let rd = randomBetween(0, 10);
            circRadii[i] = rd;
    
            let r = parseInt(randomBetween(50, 255));
            let g = parseInt(randomBetween(50, 255));
            let b = parseInt(randomBetween(50, 255));
            let clr = "rgb(" + r + "," + g + "," + b + ")";
            circClrs[i] = clr;
        }
    }
}