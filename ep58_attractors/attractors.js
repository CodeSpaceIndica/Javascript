//Constants
const DEPTH = 400;
const NUM_POINTS = 2000;

var width, height;
var xCenter, yCenter;

var ctx;

var currentAttractor;

var fontSize;

var points;

var bCanvas, bCtx;
var fCtr;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    //get the width, height and 
    //set the font and finally translate 
    //the canvas to the center of the canvas.
    width = canvasElement.width;
    height = canvasElement.height;
    xCenter = width/2;
    yCenter = height/2;

    fontSize = parseInt(width / 40);
    ctx.font = fontSize + "px Monospace";
    ctx.lineWidth = 4;
    ctx.translate(xCenter, yCenter);

    //initialize the background canvas that has the 
    //floating circle following the attractor points.
    bCanvas = document.createElement("canvas");
    bCanvas.width = width;
    bCanvas.height = height;
    bCtx = bCanvas.getContext("2d");
    bCtx.translate(xCenter, yCenter);

    //Add events to the canvas.
    addEvents(canvasElement);

    //Initialize the attractors from definititions.
    initDefinitions();
});

/**
 * Initialize the select with all the attractors
 * as options.
 */
function initDefinitions() {
    let selectDiv = document.getElementById("selectDiv");

    let selectElem = document.createElement("select");
    selectElem.id = "attractorSelect";

    definitions.attractors.forEach(attractor => {
        let id = attractor.id;
        let name = attractor.object.name();
        let optionElem = document.createElement("option");
        optionElem.value = id;
        optionElem.innerText = name;

        selectElem.appendChild(optionElem);
    });

    selectDiv.appendChild(selectElem);

    document.getElementById("attractorSelect").addEventListener("change", changeAttractor);

    changeAttractor();

    attract();
}

/**
 * When the attractor is changed from the select box, call the 
 * generatorPoints of the attractor class
 */
function changeAttractor() {
    let attractorID = document.getElementById("attractorSelect").value;

    definitions.attractors.forEach(attractor => {
        let id = attractor.id;
        if( id == attractorID ) {
            currentAttractor = attractor.object;
            points = currentAttractor.generatePoints();

            fCtr = 0;

            return;
        }
    });
}

/**
 * Render the threeDPoints as 2D points using Weak projection
 */
function attract() {
    ctx.drawImage(bCanvas, -xCenter, -yCenter);

    let hue = 0;
    let projected = DEPTH / (DEPTH + points[0].z);
    let pX = points[0].x * projected;
    let pY = points[0].y * projected;
    for(let i=1; i<points.length; i++) {
        projected = DEPTH / (DEPTH + points[i].z);
        let xProj = points[i].x * projected;
        let yProj = points[i].y * projected;
        ctx.strokeStyle = "hsl(" + hue + ",100%,50%)";
        ctx.beginPath();
        ctx.moveTo(pX, pY);
        ctx.lineTo(xProj, yProj);
        ctx.stroke();
        pX = xProj;
        pY = yProj;
        hue++;
    }

    //All the text you see on the canvas.
    ctx.fillStyle = "#FFFFFF";
    let x = -xCenter+5;
    let y = -yCenter+fontSize;
    ctx.fillText(currentAttractor.name(), x, y);
    y += 5;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+100, y);
    ctx.stroke();
    if( currentAttractor.a ) {
        y += fontSize;
        ctx.fillText("a = " + currentAttractor.a, x, y);
    }
    if( currentAttractor.b ) {
        y += fontSize;
        ctx.fillText("b = " + currentAttractor.b, x, y);
    }
    if( currentAttractor.c ) {
        y += fontSize;
        ctx.fillText("c = " + currentAttractor.c, x, y);
    }
    if( currentAttractor.d ) {
        y += fontSize;
        ctx.fillText("d = " + currentAttractor.d, x, y);
    }
    if( currentAttractor.e ) {
        y += fontSize;
        ctx.fillText("e = " + currentAttractor.e, x, y);
    }
    if( currentAttractor.f ) {
        y += fontSize;
        ctx.fillText("f = " + currentAttractor.f, x, y);
    }
    y += 5;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+100, y);
    ctx.stroke();
    if( currentAttractor.x0 ) {
        y += fontSize;
        ctx.fillText("x0 = " + currentAttractor.x0, x, y);
    }
    if( currentAttractor.y0 ) {
        y += fontSize;
        ctx.fillText("y0 = " + currentAttractor.y0, x, y);
    }
    if( currentAttractor.z0 ) {
        y += fontSize;
        ctx.fillText("z0 = " + currentAttractor.z0, x, y);
    }

    flutter();

    requestAnimationFrame(attract);
}

/**
 * Generate the small circle that traverses the 
 * generated attractor points
 */
function flutter() {
    bCtx.fillStyle = "#000000";
    bCtx.beginPath();
    bCtx.rect(-xCenter, -yCenter, width, height);
    bCtx.fill();

    let projected = DEPTH / (DEPTH + points[fCtr].z);
    let xProj = points[fCtr].x * projected;
    let yProj = points[fCtr].y * projected;

    let radius = map(projected, 0, 2, 3, 7);
    radius = constrain(radius, 3, 7);
    bCtx.fillStyle = "#FFFFFF";
    bCtx.beginPath();
    bCtx.arc(xProj, yProj, radius, 0, Constants.TWO_PI, false);
    bCtx.fill();

    fCtr++;
    if( fCtr > points.length-1 ) {
        fCtr = 0;
    }
}