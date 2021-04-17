var width, height;

var ctx;

var cx, cy;
var size;

var numSides = 3;
var factor = 1/2;

var points = [];
var startPoint;

var ctr;
var max = 25000;

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    cx = width/2;
    cy = height/2;
    size = (width/2) - 25;

    initControls();

    drawFractal();
}

function initControls() {
    let numSidesRng = document.getElementById("numSidesRng"); 
    let txtBox = document.getElementById("numSidesTxt"); 
    txtBox.value = numSidesRng.value;    
    numSidesRng.oninput = function() { 
        let txtBox = document.getElementById( "numSidesTxt" ); 
        txtBox.value = this.value; 
    }

    let factorRng = document.getElementById("factorRng"); 
    txtBox = document.getElementById("factorTxt"); 
    txtBox.value = factorRng.value;
    factorRng.oninput = function() { 
        let txtBox = document.getElementById( "factorTxt" ); 
        txtBox.value = this.value; 
    }
}

function enable() {
    document.getElementById("numSidesRng").disabled = false;
    document.getElementById("factorRng").disabled = false;
    document.getElementById("drawButton").disabled = false;
}

function disable() {
    document.getElementById("numSidesRng").disabled = true;
    document.getElementById("factorRng").disabled = true;
    document.getElementById("drawButton").disabled = true;
}

function drawFractal() {
    numSides = parseInt( document.getElementById("numSidesRng").value );
    factor = parseFloat( document.getElementById("factorRng").value );
    points = [];
    ctr = 0;

    disable();

    ctx.fillStyle = "#000000";
    ctx.beginPath()
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.fillStyle = "#55FF55";
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Constants.TWO_PI, true);
    ctx.fill();

    ctx.fillStyle = "#5555FF";
    var incr = Constants.TWO_PI / numSides;
    var angle = Math.PI;
    for(let i=0; i<numSides; i++) {
        let x = (Math.sin(angle) * size) + cx;
        let y = (Math.cos(angle) * size) + cy;

        let aPoint = new Point(x, y);
        points.push(aPoint);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Constants.TWO_PI, true);
        ctx.fill();

        angle += incr;
    }

    ctx.fillStyle = "#FF5555";
    let rndAngle = randomBetween(0, Constants.TWO_PI);
    let rndSize = randomBetween(30, (size/2)-30);
    let rX = (Math.sin(rndAngle) * rndSize) + cx;
    let rY = (Math.cos(rndAngle) * rndSize) + cy;
    // ctx.beginPath();
    // ctx.arc(rX, rY, 5, 0, Constants.TWO_PI, true);
    // ctx.fill();
    startPoint = new Point(rX, rY);

    ctx.fillStyle = "#FFFFFF";
    plotPoints();
}

function plotPoints() {
    for(let i=0; i<100; i++) {
        let rndIdx = parseInt( randomBetween(0, points.length));
        rndIdx = rndIdx > points.length - 1 ? points.length - 1 : rndIdx;
        let rndPoint = points[rndIdx];

        let newX = ((1-factor) * rndPoint.x) + (factor * startPoint.x);
        let newY = ((1-factor) * rndPoint.y) + (factor * startPoint.y);

        let hue = map(newY, 0, height, 0, 360);

        ctx.fillStyle = "hsl(" + hue + ",100%,50%)";
        ctx.beginPath();
        ctx.arc(newX, newY, 2, 0, Constants.TWO_PI, true);
        ctx.fill();

        startPoint = new Point(newX, newY);

        ctr++;
        if( ctr > max ) {
            enable();
            console.log("Done");
            return;
        }
    }

    setTimeout(plotPoints, 1);
}
