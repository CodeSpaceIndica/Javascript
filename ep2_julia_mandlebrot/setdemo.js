/**
 * Class Point. Represents a point having an X and Y co-ordinate
 */
class Point {
    constructor(xx, yy) {
        this.x = xx;
        this.y = yy;
    }

    multiply(aValue) {
        this.x *= aValue;
        this.y *= aValue;
    }

    add(anotherPoint) {
        this.x += anotherPoint.x;
        this.y += anotherPoint.y;
    }

    magnitude() {
        return Math.sqrt( this.x*this.x + this.y*this.y );
    }

    log() {
        console.log(this.x + "," + this.y);
    }
}

/**
 * Maps a number of a given input range to a number of the output range.
 * 
 * @param {*} inputNum 
 * @param {*} minInput 
 * @param {*} maxInput 
 * @param {*} minOutput 
 * @param {*} maxOutput 
 */
function map(inputNum, minInput, maxInput, minOutput, maxOutput) {
    return (inputNum - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput;
}

//GLOBALS
var animContext;
var canvasWidth = 800;
var canvasHeight = 800;

var min = -1.5;
var max = 1.5;

var mouseX, mouseY;

var isButtonDown = false;

var cPoint = new Point(0, 0);

var cValDiv, zValDiv, bValDiv;

function draw() {
    animContext.clearRect(0, 0, canvasWidth, canvasHeight);

    animContext.strokeStyle = "#B1B1B1";
    animContext.beginPath();
    animContext.moveTo(canvasWidth/2, 0);
    animContext.lineTo(canvasWidth/2, canvasHeight);
    animContext.closePath();
    animContext.stroke();
    animContext.beginPath();
    animContext.moveTo(0, canvasHeight/2);
    animContext.lineTo(canvasWidth, canvasHeight/2);
    animContext.stroke();

    animContext.fillStyle = "#AAAAFF";
    var ex, ey;
    for(ex=min; ex<=max; ex+=0.1) {
        for(ey=min; ey<=max; ey+=0.1) {
            var n = 0;
            var a = ex;
            var b = ey;
            for(n=0; n<30; n++) {
                var aa = a*a - b*b;
                var bb = 2 * a * b;
        
                //Assign it back so that it can be evaulated
                //in the next iteration against itelf.
                a = aa + cPoint.x;
                b = bb + cPoint.y;

                //Whoops, Unbounded not in set
                if( Math.abs(aa+bb) > 4 ) {
                    break;
                }
            }
            //Wow, made it all the way to 30. Is in Set.
            //Mark the place on canvas.
            if( n == 30 ) {
                var mapBackX = map(ex, min, max, 0, canvasWidth);
                var mapBackY = map(ey, min, max, 0, canvasHeight);
                animContext.beginPath();
                animContext.arc(mapBackX, mapBackY, 4, 0, Math.PI*2, true);
                animContext.fill();        
            }
        }
    }

    //Draw the Graph
    animContext.fillStyle = "#666666";
    for(var i=min; i<=max; i+=0.5) {
        var x = canvasWidth/2;
        var y = map(i, min, max, 0, canvasWidth);
        animContext.beginPath();
        animContext.arc(x, y, 3, 0, Math.PI*2, true);
        animContext.fill();
        animContext.fillText("" + i, x+3, y+3);

        x = map(i, min, max, 0, canvasHeight);
        y = canvasHeight/2;
        animContext.beginPath();
        animContext.arc(x, y, 3, 0, Math.PI*2, true);
        animContext.fill();
        animContext.fillText("" + i, x-4, y+10);
    }

    var xyPoints = new Array();
    var mapMouseX = map(mouseX, 0, canvasWidth, min, max);
    var mapMouseY = map(mouseY, 0, canvasHeight, min, max);
    xyPoints.push( new Point(mouseX, mouseY) );
    var a = mapMouseX;
    var b = mapMouseY;
    var bText = "Bound";
    //We are iterating 30 times 
    //Each iteration we evaulate F(z) = Z^2 + C.
    for(var i=0; i<30; i++) {
        //This is where the magic happens. Everything else is incidental to what happens here.
        //Here's where we evaluate Z^2 + C
        var aa = a*a - b*b;
        var bb = 2 * a * b;

        //Assign it back so that it can be evaulated
        //in the next iteration against itelf.
        a = aa + cPoint.x;
        b = bb + cPoint.y;

        if( Math.abs(aa+bb) > 4 ) {
            bText = "Unbounded";
        }

        var mapBackX = map(aa, min, max, 0, canvasWidth);
        var mapBackY = map(bb, min, max, 0, canvasHeight);
        xyPoints.push( new Point(mapBackX, mapBackY) );
    }

    //Draw the lines
    animContext.strokeStyle = "#D2691E";
    animContext.beginPath();
    animContext.moveTo(xyPoints[0].x, xyPoints[0].y);
    for(var i=1; i<xyPoints.length; i++) {
        if( xyPoints[i].x > canvasWidth || xyPoints[i].y > canvasHeight ) {
            break;
        }
        animContext.lineTo(xyPoints[i].x, xyPoints[i].y);
    }
    animContext.stroke();

    //Draw the Smaller Green Circles
    animContext.fillStyle = "#006600";
    for(var i=0; i<xyPoints.length; i++) {
        animContext.beginPath();
        animContext.arc(xyPoints[i].x, xyPoints[i].y, 6, 0, Math.PI*2, true);
        animContext.fill();
    }

    //Draw the Large Red Circle representing the 
    //complex number C.
    var mapBackX = map(cPoint.x, min, max, 0, canvasWidth);
    var mapBackY = map(cPoint.y, min, max, 0, canvasHeight);
    animContext.fillStyle = "#660000";
    animContext.beginPath();
    animContext.arc(mapBackX, mapBackY, 12, 0, Math.PI*2, true);
    animContext.fill();

    animContext.fillStyle = "black";
    animContext.fillText(mapMouseX.toFixed(2) + "," + mapMouseY.toFixed(2) + " - " + cPoint.x.toFixed(2) + " + " + cPoint.y.toFixed(2) + "i - " + bText, 2, 10);
    cValDiv.innerHTML = "C :" + cPoint.x.toFixed(2) + " + " + cPoint.y.toFixed(2);
    zValDiv.innerHTML = "Z :" + mapMouseX.toFixed(2) + "," + mapMouseY.toFixed(2);
    bValDiv.innerHTML = bText;
}

function addEvents() {
    var theCanvas = document.getElementById("setDemoCanvas");

    theCanvas.onmousedown = function(evt) {
        isButtonDown = true;
    }

    theCanvas.onmouseup = function(evt) {
        isButtonDown = false;
    }

    theCanvas.onmousemove = function(evt) {
        var boundingRect = this.getBoundingClientRect();
        if( isButtonDown ) {
            cPoint.x = evt.clientX - boundingRect.left;
            cPoint.y = evt.clientY - boundingRect.top;

            cPoint.x = map(cPoint.x, 0, canvasWidth, min, max);
            cPoint.y = map(cPoint.y, 0, canvasHeight, min, max);
        }
        else {
            mouseX = evt.clientX - boundingRect.left;
            mouseY = evt.clientY - boundingRect.top;
        }
        draw();
    }

    theCanvas.onclick = function(evt) {
        var boundingRect = this.getBoundingClientRect();
        cPoint.x = evt.clientX - boundingRect.left;
        cPoint.y = evt.clientY - boundingRect.top;
        cPoint.x = map(cPoint.x, 0, canvasWidth, min, max);
        cPoint.y = map(cPoint.y, 0, canvasHeight, min, max);
        draw();
    }

    theCanvas.ontouchmove = function(evt) {
        var boundingRect = this.getBoundingClientRect();
        mouseX = evt.touches[0].clientX - boundingRect.left;
        mouseY = evt.touches[0].clientY - boundingRect.top;
        draw();
        evt.preventDefault();
    }
}

function init() {
    var theCanvas = document.getElementById("setDemoCanvas");
    animContext = theCanvas.getContext("2d");

    animContext.lineWidth = 1;
    animContext.font = "10px Monospace";

    cValDiv = document.getElementById("cValue");
    zValDiv = document.getElementById("zValue");
    bValDiv = document.getElementById("bValue");

    addEvents();

    draw();
};