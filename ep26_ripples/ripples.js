const DAMPING = 0.95;
const DISTURBANCE = 512;
const PLOPSIZE = 5;

var width, height;

var ctx;

var imageData, pixelData, origPixelData;

var current, previous;

/**
 * Initialize the Canvas
 */
async function init() {
    //Init the canvas
    var canvasElement = document.getElementById("rCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    await loadImage();
}

/**
 * Load the image.
 * 
 * @returns Promise
 */
function loadImage() {
    // wanted to keep the init function a bit more clean
    return new Promise((resolve, reject) => {
        const imageObject = new Image();

        imageObject.onload = () => resolve(loadPixels(imageObject));
        imageObject.src = "pebbles.png";
    });
}

function loadPixels(imageObject) {
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    let tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(imageObject, 0, 0);
    imageData = tempCtx.getImageData(0, 0, width, height);
    pixelData = imageData.data;

    // simple trick to deep copy in JavaScript
    origPixelData = JSON.parse(JSON.stringify(pixelData));

    current  = [];
    previous = [];

    for (let i = 0; i < width; ++i) {
        // a bit terse, but gets the job done
        current.push(Array.from({ length: height }, (v, i) => 0));
        previous.push(Array.from({ length: height }, (v, i) => 0));
    }

    ripples();

    rainDrops();
}

function rainDrops() {
    let x = parseInt( randomBetween(0, width) );
    let y = parseInt( randomBetween(0, height) );
    let disturbance = parseInt( randomBetween(512, 1024) );

    plop(x, y, disturbance);

    setTimeout(rainDrops, 200);
}

function plop(x, y, disturbance) {
    for(let i=x-PLOPSIZE; i<x+PLOPSIZE; i++) {
        for(let j=y-PLOPSIZE; j<y+PLOPSIZE; j++) {
            if( i > 0 && i < width && j > 0 && j < height ) {
                previous[i][j] = disturbance;
            }
        }
    }
}

function ripples() {
    for(let i=1; i<width-1; i++) {
        for(let j=1; j<height-1; j++) {
            current[i][j] = (
                    previous[i-1][j] + 
                    previous[i+1][j] + 
                    previous[i][j-1] + 
                    previous[i][j+1] 
                ) / 2 - current[i][j];
            let xOffset = current[i-1][j] - current[i+1][j];
            let yOffset = current[i][j-1] - current[i][j+1];
            let shading = xOffset;

            xOffset >>= 1;
            yOffset >>= 1;

            let newPixX = i + xOffset;
            newPixX = newPixX < 0 ? 0 : newPixX;
            newPixX = newPixX > width-1 ? width-1 : newPixX;
            let newPixY = j + yOffset;
            newPixY = newPixY < 0 ? 0 : newPixY;
            newPixY = newPixY > height-1 ? height-1 : newPixY;

            let currPix = (i + j * width) * 4;
            let newPix  = (newPixX + newPixY * width) * 4;
            pixelData[currPix+0] = origPixelData[newPix+0] + shading;
            pixelData[currPix+1] = origPixelData[newPix+1] + shading;
            pixelData[currPix+2] = origPixelData[newPix+2] + shading;
            pixelData[currPix+3] = 255;

            current[i][j] = current[i][j] * DAMPING;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    let temp = previous;
    previous = current;
    current = temp;

    requestAnimationFrame(ripples);
}
