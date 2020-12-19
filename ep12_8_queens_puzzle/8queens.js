var width = 800;
var height = 800;

var queensCtx;

var queenCharacter = "\u265B";

var N = 8;
var squareSize;

var boardArray = [];

/**
 * Given an index of a double dimensional array, give its X and Y co-ords
 */
function getPosition(i, j) {
    var point = new Point(squareSize * i, squareSize * j);

    return point;
}

/**
 * draw text at a given index of the checker-board.
 * @param {*} i 
 * @param {*} j 
 * @param {*} text 
 */
function putTextAtIndex(i, j, text) {
    queensCtx.fillStyle = "#000000";
    var pos = getPosition(i, j);
    queensCtx.fillText(text, pos.x+10, pos.y+90);
}

/**
 * Draw checkerboard 
 */
function drawCheckerBoard() {
    var startX = 0;
    var startY = 0;
    queensCtx.strokeStyle = "rgba(1, 1, 1, 0)";
    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( (i+j) % 2 == 0 ) {
                queensCtx.fillStyle = "rgba(118,150,86, 1)";
            }
            else {
                queensCtx.fillStyle = "rgba(238,238,210, 1)";
            }
            queensCtx.beginPath();
            queensCtx.rect(startX, startY, squareSize, squareSize);
            queensCtx.fill();
            startX += squareSize;
        }
        startX = 0;
        startY += squareSize;
    }
}

function canPlace(aBoard, row, col) {
    //Check the rows
    for(var i=0; i<N; i++) {
        if( aBoard[i][col] == 1 ) {
            return false;
        }
    }

    //Check the cols
    for(var i=0; i<N; i++) {
        if( aBoard[row][i] == 1 ) {
            return false;
        }
    }

    //Top left diagnol
    var i = row - 1;
    var j = col - 1;
    while( i >= 0 && j >= 0 ) {
        if( aBoard[i][j] == 1 ) {
            return false;
        }
        i--;
        j--;
    }

    //bottom right diagnol
    var i = row + 1;
    var j = col + 1;
    while( i < N && j < N ) {
        if( aBoard[i][j] == 1 ) {
            return false;
        }
        i++;
        j++;
    }

    //top right diagnol
    var i = row - 1;
    var j = col + 1;
    while( i >= 0 && j < N ) {
        if( aBoard[i][j] == 1 ) {
            return false;
        }
        i--;
        j++;
    }

    //top right diagnol
    var i = row + 1;
    var j = col - 1;
    while( i <N && j >= 0 ) {
        if( aBoard[i][j] == 1 ) {
            return false;
        }
        i++;
        j--;
    }

    return true;
}

function placeQueens(aBoard, col) {
    //If all queens are placed then return true.
    //N is the size of the board.
    if (col >= N)
      return true;
      
    //Try placing this queen in all rows one by one
    for(var i=0; i<N; i++) {  
      //Check if queen can be placed on chessBoard[i][col]  
      if ( canPlace(aBoard, i, col) ) {
        //Place this queen in chessBoard[i][col]
        //1 represents the queen being placed. 0 is empty.
        aBoard[i][col] = 1;
  
        //recursively place rest of the queens
        if (placeQueens(aBoard, col + 1)) 
          return true;
  
        //If placing queen in chessBoard[i][column] 
        //doesn't lead to a solution, then remove that queen 
        aBoard[i][col] = 0; //BACKTRACK
      }
    }
    //If queen cannot be place in any row in this column
    //then return false
    return false;
}

function renderBoard() {
    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( boardArray[i][j] == 1 ) {
                putTextAtIndex(i, j, queenCharacter);
            }
        }
    }
}

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("8queensCanvas");
    queensCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    squareSize = width / N;

    queensCtx.font = "120px Mono";

    for(var i=0; i<N; i++) {
        boardArray.push([]);
        for(var j=0; j<N; j++) {
            boardArray[i].push(0);
        }
    }

    drawCheckerBoard();

    //boardArray[0][0] = 1;
    placeQueens(boardArray, 0);

    renderBoard();
}
