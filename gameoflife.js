
const WIDTH  = 1000;
const HEIGHT = 800;

const NUM_CELLS_X = 100;
const NUM_CELLS_Y = 80;

const DEAD_CELL_COLOR = "#E1E1E1";
const LIVE_CELL_COLOR = "#FF0000";
const BORDER_COLOR    = "#999999";

const NEIGHBOUR_OFFSETS = [
    [-1,-1],[-1,0],[-1,1],
    [0,-1],        [0,1],
    [1,-1], [1,0], [1,1]
]

var currFrame = new Array();
var prevFrame = new Array();

var canvasContext;

var xSize, ySize;

function copyFrame() {
    for(var i=0; i<NUM_CELLS_X; i++) {
        for(var j=0; j<NUM_CELLS_Y; j++) {
            prevFrame[i][j] = currFrame[i][j];
        }
    }
}

function init() {
    for(var i=0; i<NUM_CELLS_X; i++) {
        currFrame[i] = new Array();
        prevFrame[i] = new Array();
        for(var j=0; j<NUM_CELLS_Y; j++) {
            var randNumber = Math.random() * 200;
            currFrame[i][j] = (randNumber > 100);
            prevFrame[i][j] = false;
        }
    }

    copyFrame();

    var canvasElement = document.getElementById("gLifeCanvas");
    canvasContext = canvasElement.getContext("2d");

    xSize = WIDTH / NUM_CELLS_X;
    ySize = HEIGHT / NUM_CELLS_Y;

    //drawFrame();
    animateFrame();
}

function getRandomNumber() {
    var num = Math.random() * 200;
    return parseInt(num);
}

function genRandomColor() {
    var clr = "RGB(";
    clr += getRandomNumber() + ","; //red
    clr += getRandomNumber() + ","; //green
    clr += getRandomNumber() + ")"; //blue

    return clr;
}

function drawFrame() {
    var x = 0;
    var y = 0;
    canvasContext.strokeStyle = BORDER_COLOR;
    for(var i=0; i<NUM_CELLS_X; i++) {
        for(var j=0; j<NUM_CELLS_Y; j++) {
            if( currFrame[i][j] ) {
                //canvasContext.fillStyle = LIVE_CELL_COLOR;
                canvasContext.fillStyle = genRandomColor();
            }
            else {
                canvasContext.fillStyle = DEAD_CELL_COLOR;
            }
            canvasContext.fillRect(x, y, xSize, ySize);
            canvasContext.beginPath();
            canvasContext.rect(x, y, xSize, ySize);
            canvasContext.stroke();
            y += ySize;
        }
        x += xSize;
        y = 0;
    }
}

function animateFrame() {

    for(var i=0; i<NUM_CELLS_X; i++) {
        for(var j=0; j<NUM_CELLS_Y; j++) {
            var countAlive = 0;
            for(index in NEIGHBOUR_OFFSETS) {
                var arr = NEIGHBOUR_OFFSETS[index];
                var ii = i + arr[0];
                ii = ii < 0 ? 0 : ii;
                ii = ii > NUM_CELLS_X-1 ? NUM_CELLS_X-1 : ii;
                var jj = j + arr[1];
                jj = jj < 0 ? 0 : jj;
                jj = jj > NUM_CELLS_Y-1 ? NUM_CELLS_Y-1 : jj;
                if( prevFrame[ii][jj] ) {
                    countAlive++;
                }
            }

            //Any live cell with fewer than two live neighbours dies, as if by underpopulation
            if( prevFrame[i][j] && countAlive < 2 ) {
                currFrame[i][j] = false;
            }

            //Any live cell with two or three live neighbours lives on to the next generation.
            if( prevFrame[i][j] && (countAlive == 2 || countAlive == 3) ) {
                currFrame[i][j] = true;
            }

            //Any live cell with more than three live neighbours dies, as if by overpopulation.
            if( prevFrame[i][j] && countAlive > 3 ) {
                currFrame[i][j] = false;
            }

            //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if( !prevFrame[i][j] && countAlive == 3 ) {
                currFrame[i][j] = true;
            }
        }
    }

    drawFrame();
    copyFrame();

    setTimeout(animateFrame, 100);
}

