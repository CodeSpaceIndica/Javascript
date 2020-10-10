
const width = 1800;
const height = 200;

const min = -2;
const max = 2;

const maxIterations = 20;

var canvasLeftOffset;
var jsContext;

var C = 0;
var cX = width/2;
var moveC = false;
var cValDiv;

function map(inputNum, minInput, maxInput, minOutput, maxOutput) {
    return (inputNum - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput;
}

function init() {
    var canvasElem = document.getElementById("OneDimJSCanvas");
    jsContext = canvasElem.getContext("2d");

    canvasLeftOffset = canvasElem.offsetLeft + canvasElem.clientLeft;
    canvasElem.addEventListener("mousedown", function(event) {
        moveC = true;
    });
    canvasElem.addEventListener("mousemove", function(event) {
        if( moveC ) {
            cX = event.pageX - canvasLeftOffset;
            drawSet();
        }
    });
    canvasElem.addEventListener("mouseup", function(event) {
        moveC = false;
    });

    cValDiv = document.getElementById("cValue");

    jsContext.strokeWidth = "1.0";

    drawSet();
}

function drawSet() {
    jsContext.clearRect(0, 0, width, height);

    jsContext.strokeStyle = "#C1C1C1";
    jsContext.beginPath();
    jsContext.moveTo(0, height/2);
    jsContext.lineTo(width, height/2);
    jsContext.stroke();

    jsContext.strokeStyle = "#0000C1";
    for(var x=0; x<width; x++) {
        var z = map(x, 0, width, min, max);

        var n = 0;
        for(n=0; n<maxIterations; n++) {
            var zz = z*z;
    
            //Assign it back so that it can be evaulated
            //in the next iteration against itelf.
            z = zz + C;

            //Whoops, Unbounded not in set
            if( Math.abs(zz) > 16 ) {
                break;
            }
        }

        //Wow, made it all the way to 30. Is in Set.
        //Mark the place on canvas.
        //  if( n == maxIterations ) {
        //      jsContext.beginPath();
        //      jsContext.moveTo(x, 0);
        //      jsContext.lineTo(x, height);
        //      jsContext.stroke();
        // }

        var blueClr = map(n, 0, maxIterations, 0, 255);
        jsContext.strokeStyle = "RGB(0, 0, " + blueClr + ")";
        jsContext.beginPath();
        jsContext.moveTo(x, 0);
        jsContext.lineTo(x, height);
        jsContext.stroke();
    }

    jsContext.strokeStyle = "#C10000";
    jsContext.beginPath();
    jsContext.moveTo(cX, 0);
    jsContext.lineTo(cX, height);
    jsContext.stroke();
    C = map(cX, 0, width, min, max);
    cValDiv.innerHTML = C.toFixed(2);

    jsContext.fillStyle = "#A1A1A1";
    for(var i=min; i<=max; i+=0.5) {
        var x = map(i, min, max, 0, width);
        jsContext.beginPath();
        jsContext.arc(x, height/2, 3, 0, Math.PI*2, true);
        jsContext.fill();
        jsContext.fillText(i+"", x-5, (height/2)+13)
    }
}