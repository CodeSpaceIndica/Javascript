var chessCtx;

var boardArray = [];

var idxI = 0;

var startRow = 0;

function initSelfPlay() {
    var aCanvas = document.getElementById('chessCanvas');
    resizeCanvas(aCanvas, false);

    chessCtx = aCanvas.getContext('2d');

	width = aCanvas.width;
    height = aCanvas.height;
    squareSize = width / N;

    fontSize = parseInt(squareSize * 1.47);
    chessCtx.font = fontSize + "px Mono";

    for(var i=0; i<N; i++) {
        boardArray.push( [] )
        for(var j=0; j<N; j++) {
            boardArray[i].push(0)
        }
    }

    drawCheckerBoard(chessCtx);

    var rowIs = [];
    var start = startRow;
    for(var i=0; i<N; i++) {
        rowIs.push(start);
        start++;
        if(start >= N) {
            start = 0;
        }
    }
    startRow++;

    placeQueens(boardArray, rowIs, 0);

    chessCtx.fillStyle = "#000000";
    animateMoves();
}

function animateMoves() {
    for(var j=0; j<N; j++) {
        if( boardArray[idxI][j] == 1 ) {
            //putTextAtIndex(chessCtx, idxI, j, queenCharacter);
            putQueenAtIndex(chessCtx, idxI, j);
            placeDots(chessCtx, boardArray, idxI, j);
        }
    }
    idxI++;

    if( idxI > N-1 ) {
        setTimeout(resetAnim, 2000);
        return;
    }

    setTimeout(animateMoves, 1000);
}

function resetAnim() {
    resetBoard(boardArray);

    rowIs = [];
    start = startRow;
    for(var i=0; i<N; i++) {
        rowIs.push(start);
        start++;
        if(start >= N) {
            start = 0;
        }
    }

    placeQueens(boardArray, rowIs, 0);

    idxI = 0;
    startRow++;
    if( startRow > N-1 ) {
        startRow = 0;
    }

    chessCtx.clearRect(0, 0, width, height);
    drawCheckerBoard(chessCtx);

    setTimeout(animateMoves, 100);
}

/**
 * a method that places the queens on the board using the 
 * recursive backtracking algorithm.
 * 
 * @param {*} aBoard 
 * @param {*} rowIndices 
 * @param {*} col 
 */
function placeQueens(aBoard, rowIndices, col) {
    if(col >= N) {
        return true;
    }

    for(var i=0; i<N; i++) {
        var idx = rowIndices[i];
        if( isPlaceSafe(aBoard, idx, col) ) {
            aBoard[idx][col] =  1;

            if( placeQueens(aBoard, rowIndices, col+1) ) {
                return true;
            }

            aBoard[idx][col] = 0; //Backtrack
        }
    }

    return false;
}

