//CONSTANTS
const WIDTH = 1000;
const HEIGHT = 800;

const MINC = -1.5;
const MAXC = 1.5;

const MAX_ITERATION = 100;
const BOUND_CHECK = 4;

//VARIABLES
var cX = -0.8;
var cY = 0.156;

var canvasContext;
var imageData, pixelData;

var isDown = false;

var divElem;

/**
 * The function that evaulates F(z+1) = z^2 + c function for 
 * MAX_ITERATION and determines if the number belongs to 
 * the Julia/Mandlebrot set or not.
 */
function drawSet() {
    for(var x=0; x<WIDTH; x++) {
        for(var y=0; y<HEIGHT; y++) {
            var zX = map(x, 0, WIDTH, MINC, MAXC);
            var zY = map(y, 0, HEIGHT, MINC, MAXC);
            //UNCOMMENT THIS TO TRANSFORM THIS TO A MANDLEBROT SET.
            //cX = zX;
            //cY = zY;

            for(var n=0; n<MAX_ITERATION; n++) {
                var zxx = zX*zX - zY*zY;
                var zyy = 2 * zX * zY;

                if( Math.abs(zxx+zyy) > BOUND_CHECK )  {
                    break;
                }

                zX = zxx + cX;
                zY = zyy + cY;
            }

            //var brightness = 0;
            //if( n == MAX_ITERATION ) {
            //    brightness = 255;
            //}
            var brightness = map(n, 0, MAX_ITERATION, 0, 255);

            var px = (x + y * WIDTH) * 4;
            pixelData[px+0] = brightness;
            pixelData[px+1] = brightness;
            pixelData[px+2] = brightness;
            pixelData[px+3] = 255;
        }
    }
    canvasContext.putImageData(imageData, 0, 0);
}

/**
 * Initialize the Canvas, events and the HTML DIV element.
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("setCanvas");
    canvasContext = canvasElement.getContext("2d");

    imageData = canvasContext.createImageData(WIDTH, HEIGHT);
    pixelData = imageData.data;

    //INitialize the HTML Div element so we can put the value of C on it.
    divElem = document.getElementById("cVal");

    //Add the events.
    canvasElement.addEventListener("mousedown", function(event) {
        isDown = true;
    });
    canvasElement.addEventListener("mouseup", function(event) {
        isDown = false;
    });
    canvasElement.addEventListener("mousemove", function(event) {
        if( isDown ) {//If mouse is down
            cX = map(event.pageX-180, 0, WIDTH, MINC, MAXC);
            cY = map(event.pageY-10, 0, HEIGHT, MINC, MAXC);

            cValStr = cX.toFixed(2) + "," + cY.toFixed(2);
            divElem.innerHTML = cValStr;

            drawSet();
        }
    });

    //Call the drawSet the first time.
    drawSet();
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
