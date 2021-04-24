//GLOBALS
const rows = 25;
const cols = 11;

var ctx;
var width, height;

var cellSize = 20;

var tetrisArr = [];

var currPiece, row, col;
var isKeyDown = false;

//ANIMATION FUNCTIONS
function init() {
    let theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

    width = theCanvas.width;
    height= theCanvas.height;

    addEvents();

    cellSize = height / rows;

    ctx.lineWidth = 0.2;

    for(let i=0; i<rows; i++) {
        tetrisArr[i] = [];
        for(let j=0; j<cols; j++) {
            tetrisArr[i][j] = 0;
        }
    }

    currPiece = randomTetrominoe();
    row = 0;
    col = parseInt( (cols/2) - (currPiece[0].length/2) );

    tetris();
}

function addEvents() {
    document.addEventListener("keydown", function(event) {
        if( event.code == "ArrowLeft" ) {
            if( col > 0 ) {
                col--;
                transposePiece();
                drawBoard();
            }
        }
        else if( event.code == "ArrowRight" ) {
            if( col < cols-currPiece[0].length ) {
                col++;
                transposePiece();
                drawBoard();
            }
        }
        else if( event.code == "ArrowDown" ) {
            isKeyDown = true;
            row++;
            transposePiece();
            drawBoard();
        }
        else if( event.code == "ArrowUp" ) {
            currPiece = rotate90Clockwise(currPiece);
            transposePiece();
            drawBoard();
        }
    });

    document.addEventListener("keyup", function(event) {
        if( event.code == "ArrowDown" ) {
            isKeyDown = false;
        }
    });
}

function tetris() {
    if( !isKeyDown ) {
        dropPiece();
        transposePiece();

        drawBoard();
    }

    setTimeout(tetris, 300);
}

function drawBoard() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.strokeStyle = "#666666";
    let x = 0;
    let y = 0;
    for(let i=0; i<tetrisArr.length; i++) {
        for(let j=0; j<tetrisArr[i].length; j++) {
            ctx.beginPath();
            ctx.rect(x, y, cellSize, cellSize);
            ctx.stroke();

            if( tetrisArr[i][j] == 1 ) {
                ctx.fillStyle = "#55FF55";
                ctx.beginPath();
                ctx.rect(x+1, y+1, cellSize-1, cellSize-1);
                ctx.fill();
            }
            if( tetrisArr[i][j] == 2 ) {
                ctx.fillStyle = "#FFFF00";
                ctx.beginPath();
                ctx.rect(x+1, y+1, cellSize-1, cellSize-1);
                ctx.fill();
            }

            x += cellSize;
        }
        x = 0;
        y += cellSize;
    }
}

function transposePiece() {
    for(let i=0; i<tetrisArr.length; i++) {
        for(let j=0; j<tetrisArr[i].length; j++) {
            tetrisArr[i][j] = 0;
        }
    }

    for(let i=0; i<currPiece.length; i++) {
        for(let j=0; j<currPiece[i].length; j++) {
            tetrisArr[i+row][j+col] = currPiece[i][j];
        }
    }
}

function dropPiece() {
    row++;
}

function randomTetrominoe() {
    let rnd = parseInt( randomBetween(0, allTetrominoes.length+1) );
    rnd = rnd > allTetrominoes.length-1 ? allTetrominoes.length-1 : rnd;
    return allTetrominoes[rnd];
}

function rotate90Clockwise(anArray) {
    let N = anArray.length;
    let returnArray = [];

    for(let i=0; i<anArray.length; i++) {
        returnArray[i] = [];
        for(let j=0; j<anArray[i].length; j++) {
            returnArray[i][j] = anArray[N-j-1][i];
        }
    }

    return returnArray;
}