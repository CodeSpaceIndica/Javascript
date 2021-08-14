//Constants
const GRID_SIZE = 200;

var width, height;

var ctx;

var reactionCanvas, rCtx;
var imageData, pixelData;

var currGrid, nextGrid;

var diffA = 1;
var diffB = 0.5;
var feedRate = 0.055;
var killRate = 0.0628;

/**
 * Initialize animation.
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    ctx.scale(4, 4);

    width = canvasElement.width;
    height = canvasElement.height;

    reactionCanvas = document.createElement("canvas");
    reactionCanvas.width = GRID_SIZE;
    reactionCanvas.height = GRID_SIZE;
    rCtx = reactionCanvas.getContext("2d");
    imageData = rCtx.createImageData(GRID_SIZE, GRID_SIZE);
    pixelData = imageData.data;

    currGrid = [];
    nextGrid = [];
    for(let x=0; x<GRID_SIZE; x++) {
        currGrid[x] = [];
        nextGrid[x] = [];
        for(let y=0; y<GRID_SIZE; y++) {
            currGrid[x][y] = {
                a: 1,
                b: 0
            };
            nextGrid[x][y] = {
                a: 1,
                b: 0
            };
        }
    }

    for(let i=90; i<100; i++) {
        for(let j=90; j<100; j++) {
            currGrid[i][j].b = 1;
        }
    }

    reactionDiffusion();
}

function reactionDiffusion() {
    for(let x=1; x<GRID_SIZE-1; x++) {
        for(let y=1; y<GRID_SIZE-1; y++) {
            let a = currGrid[x][y].a;
            let b = currGrid[x][y].b;

            nextGrid[x][y].a = a + diffA * laplacianA(x, y) - a * b * b + feedRate * (1 - a);
            nextGrid[x][y].b = b + diffB * laplacianB(x, y) + a * b * b - (killRate + feedRate) * b;

            nextGrid[x][y].a = nextGrid[x][y].a > 1 ? 1 : nextGrid[x][y].a;
            nextGrid[x][y].a = nextGrid[x][y].a < 0 ? 0 : nextGrid[x][y].a;
            nextGrid[x][y].b = nextGrid[x][y].b > 1 ? 1 : nextGrid[x][y].b;
            nextGrid[x][y].b = nextGrid[x][y].b < 0 ? 0 : nextGrid[x][y].b;
        }
    }

    for(let x=0; x<GRID_SIZE; x++) {
        for(let y=0; y<GRID_SIZE; y++) {
            let pix = (x+y*GRID_SIZE) * 4;
            let a = nextGrid[x][y].a;
            let b = nextGrid[x][y].b;
            let c = Math.floor( (a-b) * 255);
            c = c > 255 ? 255 : c;
            c = c < 0 ? 0 : c;
            pixelData[pix+0] = c;
            pixelData[pix+1] = c;
            pixelData[pix+2] = c;
            pixelData[pix+3] = 255;
        }
    }

    rCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(reactionCanvas, 0, 0);

    let temp = currGrid;
    currGrid = nextGrid;
    nextGrid = temp;

    setTimeout(reactionDiffusion, 5);
}

function laplacianA(x, y) {
    let sum = 0;
    sum += currGrid[x][y].a * -1;

    sum += currGrid[x-1][y].a * 0.2;
    sum += currGrid[x+1][y].a * 0.2;
    sum += currGrid[x][y-1].a * 0.2;
    sum += currGrid[x][y+1].a * 0.2;

    sum += currGrid[x-1][y-1].a * 0.05;
    sum += currGrid[x+1][y-1].a * 0.05;
    sum += currGrid[x+1][y+1].a * 0.05;
    sum += currGrid[x-1][y+1].a * 0.05;

    return sum;
}

function laplacianB(x, y) {
    let sum = 0;
    sum += currGrid[x][y].b * -1;

    sum += currGrid[x-1][y].b * 0.2;
    sum += currGrid[x+1][y].b * 0.2;
    sum += currGrid[x][y-1].b * 0.2;
    sum += currGrid[x][y+1].b * 0.2;

    sum += currGrid[x-1][y-1].b * 0.05;
    sum += currGrid[x+1][y-1].b * 0.05;
    sum += currGrid[x+1][y+1].b * 0.05;
    sum += currGrid[x-1][y+1].b * 0.05;

    return sum;
}