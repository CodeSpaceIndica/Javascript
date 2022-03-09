const CELL_SIZE = 8;

const DEAD_CELL_COLOR = "#222222";
const LIVE_CELL_COLOR = "#F2F261";
const BORDER_COLOR    = "#000000";

const NEIGHBOUR_OFFSETS = [
    [-1,-1],[-1,0],[-1,1],
    [0, -1],       [0, 1],
    [1, -1],[1, 0],[1, 1]
]

var canvasContext;

var width, height

var currFrame = new Array();
var prevFrame = new Array();

function init() {
    var canvasElement = document.getElementById("gLifeCanvas");
    canvasContext = canvasElement.getContext("2d");

    width  = canvasElement.width;
    height = canvasElement.height;

    canvasContext.lineWidth = 0.2;
    canvasContext.strokeStyle = BORDER_COLOR;

    var numCellsX = parseInt(width  / CELL_SIZE) + 1;
    var numCellsY = parseInt(height / CELL_SIZE) + 1;

    for(var i=0; i<numCellsX; i++) {
        currFrame[i] = new Array();
        prevFrame[i] = new Array();
        for(var j=0; j<numCellsY; j++) {
            var randNumber = Math.random() * 200;
            currFrame[i][j] = (randNumber > 100);
            prevFrame[i][j] = false;
        }
    }

    for(var i=0; i<currFrame.length; i++) {
        //Array Copy 
        prevFrame[i] = currFrame[i].slice();
    }

    animateFrame();
}

function drawFrame() {
    var x = 0;
    var y = 0;
    for(var i=0; i<currFrame.length; i++) {
        for(var j=0; j<currFrame[i].length; j++) {
            if( currFrame[i][j] ) {
                canvasContext.fillStyle = LIVE_CELL_COLOR;
            }
            else {
                canvasContext.fillStyle = DEAD_CELL_COLOR;
            }
            canvasContext.beginPath();
            canvasContext.rect(x, y, CELL_SIZE, CELL_SIZE);
            canvasContext.fill();
            canvasContext.stroke();
            y += CELL_SIZE;
        }
        x += CELL_SIZE;
        y = 0;

        //Copy the current frame over to the previous frame
        prevFrame[i] = currFrame[i].slice();
    }
}

function animateFrame() {

    for(var i=0; i<currFrame.length; i++) {
        for(var j=0; j<currFrame[i].length; j++) {
            var countAlive = 0;
            for(index in NEIGHBOUR_OFFSETS) {
                var arr = NEIGHBOUR_OFFSETS[index];
                var ii = i + arr[0];
                ii = ii < 0 ? 0 : ii;
                ii = ii > currFrame.length-1 ? currFrame.length-1 : ii;
                var jj = j + arr[1];
                jj = jj < 0 ? 0 : jj;
                jj = jj > currFrame[i].length-1 ? currFrame[i].length-1 : jj;
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

    requestAnimationFrame(animateFrame);
}

