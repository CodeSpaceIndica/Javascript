//Constants
var grid = [
    [0,5,0,0,8,0,1,0,2],
    [0,0,3,6,0,9,8,0,0],
    [1,0,4,0,0,0,0,0,9],
    [0,0,0,0,9,3,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,7,5,0,0,0,0],
    [9,0,0,0,0,0,5,0,1],
    [0,0,8,2,0,1,9,0,0],
    [3,0,1,0,4,0,0,6,0]
];
var origGrid = JSON.parse(JSON.stringify(grid));
var answerGrid;

var width, height;

var ctx;

var cellSize = 0;
var xTxtOffset = 0;
var yTxtOffset = 0;

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

    let fontSize = Math.floor(width * 0.06);
    ctx.font = fontSize + "px Mono";
    cellSize = width / 9;
    xTxtOffset = cellSize/2 - (fontSize/4);
    yTxtOffset = cellSize/2 + (fontSize/2);

    renderSudokuGrid();
}

function renderSudokuGrid() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 0.3;
    for(let i=0; i<9; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i*cellSize);
        ctx.lineTo(width, i*cellSize);
        ctx.stroke();
    }
    for(let j=0; j<9; j++) {
        ctx.beginPath();
        ctx.moveTo(j*cellSize, 0);
        ctx.lineTo(j*cellSize, height);
        ctx.stroke();
    }

    ctx.lineWidth = 1.5;
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            ctx.beginPath();
            let x = i*3*cellSize;
            let y = j*3*cellSize;
            let w = (i+1)*3*cellSize;
            let h = (j+1)*3*cellSize;
            ctx.rect(x, y, w, h);
            ctx.stroke();
        }
    }

    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            if( grid[j][i] != 0 ) {
                let x = (i*cellSize) + xTxtOffset;
                let y = (j*cellSize) + yTxtOffset;
                ctx.beginPath();
                ctx.fillText(grid[j][i], x, y);
                ctx.fill();
            }
        }
    }
}

function animateSudokuSolution() {
    let i = 0;
    let j = 0;
    do {
        i = Math.floor( randomBetween(0, 10) );
        j = Math.floor( randomBetween(0, 10) );
        if( i < 9 && j < 9 && grid[i][j] == 0 ) {
            break;
        }
    }while( true );

    grid[i][j] = answerGrid[i][j];
    renderSudokuGrid();

    let isComplete = true;
    for(i=0; i<9; i++) {
        for(j=0; j<9; j++) {
            if( grid[i][j] == 0 ) {
                isComplete = false;
                break;
            }
        }
        if( !isComplete ) {
            break;
        }
    }

    if( isComplete ) {
        document.getElementById("smiley").style.visibility = "visible";
        return;
    }

    setTimeout(animateSudokuSolution, 120);
}

//Check if it is possible to place 'n' at grid 
//location x, y
function isPossible(x, y, n) {
    for(let i=0; i<9; i++) {
        if( origGrid[x][i] == n ) {
            return false;
        }
    }

    for(let i=0; i<9; i++) {
        if( origGrid[i][y] == n ) {
            return false;
        }
    }

    let x0 = Math.floor((x / 3)) * 3;
    let y0 = Math.floor((y / 3)) * 3;
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if( origGrid[x0+i][y0+j] == n ) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Solve grid using recursion
**/
function solve() {
    for(let x=0; x<9; x++) {
        for(let y=0; y<9; y++) {
            if( origGrid[x][y] == 0 ) {
                for(let n=1; n<10; n++) {
                    if( isPossible(x, y, n) ) {
                        origGrid[x][y] = n
                        solve();
                        origGrid[x][y] = 0
                    }
                }
                return;
            }
        }
    }
    answerGrid = JSON.parse(JSON.stringify(origGrid));
    animateSudokuSolution();
}
