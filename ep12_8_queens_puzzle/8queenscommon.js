var width, height;
var N = 8;
var squareSize;
var fontSize;
var queenImage;

function drawCheckerBoard(aContext) {
    var startX = 0;
    var startY = 0;
    aContext.strokeStyle = "rgba(1, 1, 1, 0)";
    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( (i+j) % 2 == 0 ) {
                aContext.fillStyle = "rgba(118,150,86, 1)";
            }
            else {
                aContext.fillStyle = "rgba(238,238,210, 1)";
            }
            aContext.beginPath();
            aContext.rect(startX, startY, squareSize, squareSize);
            aContext.fill();
            startX += squareSize;
        }
        startX = 0;
        startY += squareSize;
    }
}

function resetBoard(aBoard) {
    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            aBoard[i][j] = 0;
        }
    }
}

function getPosition(i, j) {
    var point = new Point(squareSize * i, squareSize * j);
    return point;
}

function putTextAtIndex(aContext, i, j, text) {
    aContext.fillStyle = "#000000";
    var pos = getPosition(i, j);
    aContext.fillText(text, pos.x+2, pos.y+squareSize-2);
}

function putQueenAtIndex(aContext, i, j, text) {
    var pos = getPosition(i, j);
    aContext.drawImage(queenImage, pos.x, pos.y, squareSize, squareSize);
}

function putDotAtIndex(aContext, i, j) {
    aContext.fillStyle = "#444444";
    var pos = getPosition(i, j);
    aContext.beginPath();
    aContext.arc(pos.x+squareSize/2, pos.y+squareSize/2, 4, 0, Math.PI*2, true);
    aContext.fill();
}

/**
 * Check if a given row and column is safe.
 * 
 * @param {*} aBoard 
 * @param {*} row 
 * @param {*} col 
 */
function isPlaceSafe(aBoard, row, col) {
    //Check if the same row has a queen
    for(i=0; i<N; i++) {
        if(aBoard[i][col] == 1) {
            return false;
        }
    }

    //Check if the same column has a queen
    for(i=0; i<N; i++) {
        if(aBoard[row][i] == 1 ) {
            return false;
        }
    }

    //Check if the diagonals on the bottom-right has a queen 
    var i = row + 1
    var j = col + 1
    while(i < N && j < N) {
        if( aBoard[i][j] == 1) {
            return false;
        }
        i++;
        j++;
    }

    //Check if the diagonals on the top-left has a queen
    i = row - 1
    j = col - 1
    while(i >= 0 && j >= 0) {
        if( aBoard[i][j] == 1) {
            return false;
        }
        i--;
        j--;
    }

    //Check if the diagonals on the bottom-left has a queen
    i = row - 1
    j = col + 1
    while(i >= 0 && j < N) {
        if( aBoard[i][j] == 1) {
            return false;
        }
        i--;
        j++;
    }

    //Check if the diagonals on the top-right has a queen
    i = row + 1
    j = col - 1
    while(i < N && j >= 0) {
        if( aBoard[i][j] == 1) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

/**
 * Place dots on places wehre queen cannot be placed.
 * @param {*} row 
 * @param {*} col 
 */
function placeDots(aContext, aBoard, row, col) {
    for(i=0; i<N; i++) {
        if( aBoard[i][col] == 0 ) {
            putDotAtIndex(aContext, i, col);
        }
    }

    for(i=0; i<N; i++) {
        if( aBoard[row][i] == 0 ) {
            putDotAtIndex(aContext, row, i);
        }
    }

    var i = row + 1
    var j = col + 1
    while(i < N && j < N) {
        if( aBoard[i][j] == 0 ) {
            putDotAtIndex(aContext, i, j);
        }
        i++;
        j++;
    }

    i = row - 1
    j = col - 1
    while(i >= 0 && j >= 0) {
        if( aBoard[i][j] == 0 ) {
            putDotAtIndex(aContext, i, j);
        }
        i--;
        j--;
    }

    i = row - 1
    j = col + 1
    while(i >= 0 && j < N) {
        if( aBoard[i][j] == 0 ) {
            putDotAtIndex(aContext, i, j);
        }
        i--;
        j++;
    }

    i = row + 1
    j = col - 1
    while(i < N && j >= 0) {
        if( aBoard[i][j] == 0 ) {
            putDotAtIndex(aContext, i, j);
        }
        i++;
        j--;
    }
}

function init() {
    //To ensure that the queen character sizes are the same 
    //across devices, we will load the queen image instead of drawing a 
    //character.
    queenImage = new Image();
    queenImage.src = "res/images/episodes/12_queenspuzzle/queen.png";
    queenImage.onload = function() {
        initSelfPlay();
        initPlay();
    }
}
