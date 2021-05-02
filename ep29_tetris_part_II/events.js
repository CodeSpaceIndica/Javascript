
function addEvents() {
    document.addEventListener("keydown", function(event) {
        if( event.code == "ArrowLeft" ) {
            arrowLeftEvent();
            event.preventDefault();
        }
        else if( event.code == "ArrowRight" ) {
            arrowRightEvent();
            event.preventDefault();
        }
        else if( event.code == "ArrowDown" ) {
            arrowDownEvent();
            event.preventDefault();
        }
        else if( event.code == "ArrowUp" ) {
            arrowUpEvent();
            event.preventDefault();
        }
        else if( event.code == "Space" ) {
            dropTerominoeFully();
            event.preventDefault();
        }
    });

    document.addEventListener("keyup", function(event) {
        if( event.code == "ArrowDown" ) {
            isKeyDown = false;
        }
    });

    document.getElementById("bLeft").addEventListener("click", function(event) {
        arrowLeftEvent();
        event.preventDefault();
    });
    document.getElementById("bRight").addEventListener("click", function(event) {
        arrowRightEvent();
        event.preventDefault();
    });
    document.getElementById("bRotate").addEventListener("click", function(event) {
        arrowUpEvent();
        event.preventDefault();
    });
    document.getElementById("bDown").addEventListener("mousedown", function(event) {
        startButtonDown();
        event.preventDefault();
    });
    document.getElementById("bDown").addEventListener("touchstart", function(event) {
        startButtonDown();
        event.preventDefault();
    });
    document.getElementById("bDown").addEventListener("mouseup", function(event) {
        endButtonDown();
        event.preventDefault();
    });
    document.getElementById("bDown").addEventListener("touchend", function(event) {
        endButtonDown();
        event.preventDefault();
    });
    document.getElementById("bDown").addEventListener("mouseleave", function(event) {
        endButtonDown();
        event.preventDefault();
    });
    document.getElementById("bFullDown").addEventListener("click", function(event) {
        dropTerominoeFully();
        event.preventDefault();
    });
    document.getElementById("restartButton").addEventListener("click", function(event) {
        if( isGameOver) {
            startGame();
        }
        event.preventDefault();
    });
}

function arrowLeftEvent() {
    col--;
    if( canMoveHorizontal() ) {
        transposePiece();
        drawBoard();
    }
    else {
        col++;
    }
}

function arrowRightEvent() {
    col++;
    if( canMoveHorizontal() ) {
        transposePiece();
        drawBoard();
    }
    else {
        col--;
    }
}

function arrowDownEvent() {
    isKeyDown = true;
    dropPiece();
    transposePiece();
    drawBoard();
}

function arrowUpEvent() {
    let rotatedTetrominoe = rotate90Clockwise(currTetrominoe);
    for(let i=0; i<rotatedTetrominoe.length; i++) {
        for(let j=0; j<rotatedTetrominoe[i].length; j++) {
            if( j+col < 0 ) {
                while( j+col < 0 ) {
                    col++;
                }
            }
            if( j+col > cols-1 ) {
                while( j+col > cols-1 ) {
                    col--;
                }
            }
        }
        if( i+row > rows-1 ) {
            while( i+row > rows-1 ) {
                row--;
            }
        }
    }
    let canRotate = true;
    for(let i=0; i<rotatedTetrominoe.length; i++) {
        for(let j=0; j<rotatedTetrominoe[i].length; j++) {
            if( tetrisArr[i+row][j+col] + rotatedTetrominoe[i][j] == 3) {
                canRotate = false;
                break;
            }
        }
        if( !canRotate ) {
            break;
        }
    }
    if( canRotate ) {
        currTetrominoe = JSON.parse( JSON.stringify(rotatedTetrominoe));
        transposePiece();
        drawBoard();
    }
}

function startButtonDown() {
    bDownTmrID = setInterval(arrowDownEvent, 50);
}

function endButtonDown() {
    isKeyDown = false;
    clearInterval(bDownTmrID);
}

function dropTerominoeFully() {
    while( !dropPiece() ) {

    }
    transposePiece();
    drawBoard();
}
