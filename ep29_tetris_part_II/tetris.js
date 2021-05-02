//GLOBALS
const rows = 25;
const cols = 11;

var ctx;
var width, height;

var cellSize = 20;

var tetrisArr = [];

var currTetrominoe, row, col;
var nextTetrominoe;
var isKeyDown = false;

var score, rowsCompleted, level, gamePlaySpeed;

var isGameOver = false;

var bDownTmrID;

//ANIMATION FUNCTIONS
function init() {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);

    ctx = theCanvas.getContext("2d");

    width = theCanvas.width;
    height= theCanvas.height;

    addEvents();

    cellSize = height / rows;

    startGame();
}

function startGame() {
    for(let i=0; i<rows; i++) {
        tetrisArr[i] = [];
        for(let j=0; j<cols; j++) {
            tetrisArr[i][j] = 0;
        }
    }

    currTetrominoe = randomTetrominoe();
    nextTetrominoe = randomTetrominoe();
    row = 0;
    col = parseInt( (cols/2) - (currTetrominoe[0].length/2) );

    score = 0;
    rowsCompleted = 0;
    level = 1
    gamePlaySpeed = 500;

    isGameOver = false;

    tetris();
}

function tetris() {
    if( !isKeyDown ) {
        dropPiece();
        transposePiece();

        drawBoard();
    }
    if( isGameOver ) {
        drawBoard();

        return;
    }

    setTimeout(tetris, gamePlaySpeed);
}

function drawBoard() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let x = 0;
    let y = 0;
    for(let i=0; i<tetrisArr.length; i++) {
        for(let j=0; j<tetrisArr[i].length; j++) {
            ctx.lineWidth = 0.2;
            ctx.strokeStyle = "#666666";
            ctx.beginPath();
            ctx.rect(x, y, cellSize, cellSize);
            ctx.stroke();

            if( tetrisArr[i][j] == 1 ) {
                drawPiece(x+1, y+1, cellSize-1, cellSize-1, 85, 255, 85);
            }
            if( tetrisArr[i][j] == 2 ) {
                drawPiece(x+1, y+1, cellSize-1, cellSize-1, 255, 255, 0);
            }

            x += cellSize;
        }
        x = 0;
        y += cellSize;
    }

    x = (cols * cellSize) + 40;
    y = 50;
    for(let i=0; i<nextTetrominoe.length; i++) {
        for(let j=0; j<nextTetrominoe[i].length; j++) {
            if( nextTetrominoe[i][j] == 1) {
                drawPiece(x+1, y+1, cellSize-1, cellSize-1, 85, 85, 255);
            }
            x += cellSize;
        }
        x = (cols * cellSize) + 40;
        y += cellSize;
    }

    x = (cols * cellSize) + 30;
    y = 250;
    ctx.font = "14px Mono";
    for(idx in piecesCount) {
        ctx.fillStyle = "#00FFFF";
        ctx.fillText(piecesLabel[idx], x, y);
        ctx.fillText(":", x+12, y);
        ctx.fillText(piecesCount[idx], x+25, y);
        y += 16;
    }

    x = (cols * cellSize) + 10;
    y = height-100;
    ctx.font = "18px Mono";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score", x, y);
    ctx.fillText(":", x+58, y);
    ctx.fillText(score, x+70, y);
    y += 25;
    ctx.fillText("Level", x, y);
    ctx.fillText(":", x+58, y);
    ctx.fillText(level, x+70, y);
    y += 25;
    ctx.fillText("Rows", x, y);
    ctx.fillText(":", x+58, y);
    ctx.fillText(rowsCompleted, x+70, y);

    if( isGameOver ) {
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fill();

        ctx.fillStyle = "rgba(255,255,255,1)";
        let msg = "Game Over";
        ctx.font = "bold 40px Mono";
        let metrics = ctx.measureText(msg);
        x = (width/2) - (metrics.width/2);
        y = height/2;
        ctx.fillText(msg, x, y);
    }
}

function transposePiece() {
    for(let i=0; i<tetrisArr.length; i++) {
        for(let j=0; j<tetrisArr[i].length; j++) {
            if( tetrisArr[i][j] == 1 ) {
                tetrisArr[i][j] = 0;
            }
        }
    }

    for(let i=0; i<currTetrominoe.length; i++) {
        for(let j=0; j<currTetrominoe[i].length; j++) {
            if( typeof tetrisArr[i+row] === "undefined" ) {
                continue;
            }
            if( typeof tetrisArr[i+row][j+col] === "undefined" ) {
                continue;
            }
            if( tetrisArr[i+row][j+col] != 2 ) {
                tetrisArr[i+row][j+col] += currTetrominoe[i][j];
            }
        }
    }
}

function dropPiece() {
    let ret = false;

    row++;

    if( isSettled() ) {
        for(let i=0; i<currTetrominoe.length; i++) {
            for(let j=0; j<currTetrominoe[i].length; j++) {
                if( currTetrominoe[i][j] == 1 ) {
                    tetrisArr[i+row-1][j+col] = 2;
                }
            }
        }

        rowCompletion();
        checkGameOver();

        currTetrominoe = nextTetrominoe;
        nextTetrominoe = randomTetrominoe();
        row = 0;
        col = parseInt( (cols/2) - (currTetrominoe[0].length/2) );

        ret = true;
    }
    return ret;
}

function randomTetrominoe() {
    let rnd = parseInt( randomBetween(0, allTetrominoes.length) );
    rnd = rnd > allTetrominoes.length-1 ? allTetrominoes.length-1 : rnd;
    piecesCount[rnd]++;
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

function drawPiece(x, y, w, h, r, g, b) {
    ctx.lineWidth = 4;

    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",1.0)";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+w, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+h);
    ctx.stroke();

    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    ctx.beginPath();
    ctx.moveTo(x+w, y);
    ctx.lineTo(x+w, y+h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+w, y+h);
    ctx.lineTo(x, y+h);
    ctx.stroke();

    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",0.8)";
    ctx.beginPath();
    ctx.rect(x+2, y+2, w-5, h-5);
    ctx.fill();
}

function isSettled() {
    for(let i=0; i<currTetrominoe.length; i++) {
        for(let j=0; j<currTetrominoe[i].length; j++) {
            if( currTetrominoe[i][j] == 0 ) {
                continue;
            }

            //Reached the bottom
            if( i + row > rows - 1 ) {
                return true;
            }
            //On top of another settled piece
            if( tetrisArr[i+row][j+col] + currTetrominoe[i][j] == 3) {
                return true;
            }
        }
    }

    return false;
}

function canMoveHorizontal() {
    for(let i=0; i<currTetrominoe.length; i++) {
        for(let j=0; j<currTetrominoe[i].length; j++) {
            if( currTetrominoe[i][j] == 0 ) {
                continue;
            }

            if( currTetrominoe[i][j] == 1 ) {
                if( j+col < 0 ) {
                    return false;
                }
                if( j+col > cols-1 ) {
                    return false;
                }
                if( tetrisArr[i+row][j+col] + currTetrominoe[i][j] == 3 ) {
                    return false;
                }
            }
        }
    }
    return true;
}

function rowCompletion() {
    let completedRows = [];
    for(let i=0; i<tetrisArr.length; i++) {
        let total = 0;
        for(let j=0; j<tetrisArr[i].length; j++) {
            total += tetrisArr[i][j];
        }
        if( total == cols * 2 ) {
            completedRows.push(i);
        }
    }
    calculateScore(completedRows.length);

    completedRows.forEach(aRow => {
        for(let i=aRow; i>=0; i--) {
            for(let j=0; j<tetrisArr[aRow].length; j++) {
                let prevRow = i-1;
                if( prevRow >= 0 ) {
                    tetrisArr[i][j] = tetrisArr[prevRow][j];
                }
            }
        }
    });
}

/**
 * When we coded this, we set the level up at
 * 250 points. I did find this to be very slow 
 * at levelling up. Changed it to 100.
 * 
 * @param {*} numCompletedRows 
 */
function calculateScore(numCompletedRows) {
    rowsCompleted += numCompletedRows;

    score += numCompletedRows * cols * 2;
    if( numCompletedRows >= 4 ) {
        score += 20;
    }
    if( numCompletedRows >= 3 ) {
        score += 10;
    }
    if( numCompletedRows >= 2 ) {
        score += 5;
    }
    //Ravi was right, 250 was too muh. 
    //100 points seems about right for 
    //levelling up.
    if( score >= (level*100) ) {
        level++;
        gamePlaySpeed -= 50;
        if( gamePlaySpeed < 50 ) {
            gamePlaySpeed = 50;
        }
    }
}

function checkGameOver() {
    for(let j=0; j<cols; j++) {
        if (tetrisArr[0][j] >= 2 ) {
            isGameOver = true;
            return;
        }
    }
}
