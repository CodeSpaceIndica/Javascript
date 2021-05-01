
function addEvents() {
    document.addEventListener("keydown", function(event) {
        if( event.code == "ArrowLeft" ) {
            col--;
            if( canMoveHorizontal() ) {
                transposePiece();
                drawBoard();
            }
            else {
                col++;
            }
            event.preventDefault();
        }
        else if( event.code == "ArrowRight" ) {
            col++;
            if( canMoveHorizontal() ) {
                transposePiece();
                drawBoard();
            }
            else {
                col--;
            }
            event.preventDefault();
        }
        else if( event.code == "ArrowDown" ) {
            isKeyDown = true;
            dropPiece();
            transposePiece();
            drawBoard();
            event.preventDefault();
        }
        else if( event.code == "ArrowUp" ) {
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
            event.preventDefault();
        }
    });

    document.addEventListener("keyup", function(event) {
        if( event.code == "ArrowDown" ) {
            isKeyDown = false;
        }
    });
}
