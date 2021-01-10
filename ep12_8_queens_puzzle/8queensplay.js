var playChessCtx;

var playBoardArray = [];

function initPlay() {
    var aCanvas = document.getElementById('chessPlayCanvas');
    resizeCanvas(aCanvas, false);

    aCanvas.width = width;
    aCanvas.height = height;

    playChessCtx = aCanvas.getContext('2d');
    playChessCtx.font = fontSize + "px Mono";

    for(var i=0; i<N; i++) {
        playBoardArray.push( [] )
        for(var j=0; j<N; j++) {
            playBoardArray[i].push(0)
        }
    }

    drawCheckerBoard(playChessCtx);

	aCanvas.addEventListener("mousedown", function(evt) {   
        placeQueen(evt, this);
    });

    aCanvas.addEventListener("contextmenu", function(evt) {
        resetBoard(playBoardArray);

        playChessCtx.clearRect(0, 0, width, height);
        drawCheckerBoard(playChessCtx);
    
        drawBoardValues();

        evt.preventDefault();
        return false;
    });
}

function placeQueen(event, canvasObject) {
    playChessCtx.clearRect(0, 0, width, height);
    drawCheckerBoard(playChessCtx);

    var mouseLocation = getRealMousePosition(event, canvasObject);

    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            var square = getPosition(i, j);
            if( mouseLocation.x >= square.x && mouseLocation.x <= square.x+squareSize 
                && mouseLocation.y >= square.y && mouseLocation.y <= square.y+squareSize ) {
                if( playBoardArray[i][j] == 0 ) {
                    playBoardArray[i][j] = 1;
                }
                else if ( playBoardArray[i][j] == 1 ) {
                    playBoardArray[i][j] = 0;
                }
            }
        }
    }

    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( playBoardArray[i][j] == 2 ) {
                playBoardArray[i][j] = 0;
            }
        }
    }

    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( playBoardArray[i][j] == 1 ) {
                fillUpOccupiedPlaces(i, j);
            }
        }
    }

    drawBoardValues();
    checkVictory();
}

function drawBoardValues() {
    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( playBoardArray[i][j] == 1 ) {
                //putTextAtIndex(playChessCtx, i, j, queenCharacter);
                putQueenAtIndex(playChessCtx, i, j);
            }
            else if( playBoardArray[i][j] == 2 ) {
                putDotAtIndex(playChessCtx, i, j);
            }
        }
    }
}

function fillUpOccupiedPlaces(row, col) {
    for(i=0; i<N; i++) {
        if( playBoardArray[i][col] == 0 ) {
            playBoardArray[i][col] = 2;
        }
    }

    for(i=0; i<N; i++) {
        if( playBoardArray[row][i] == 0 ) {
            playBoardArray[row][i] = 2;
        }
    }

    var i = row + 1
    var j = col + 1
    while(i < N && j < N) {
        if( playBoardArray[i][j] == 0 ) {
            playBoardArray[i][j] = 2;
        }
        i++;
        j++;
    }

    i = row - 1
    j = col - 1
    while(i >= 0 && j >= 0) {
        if( playBoardArray[i][j] == 0 ) {
            playBoardArray[i][j] = 2;
        }
        i--;
        j--;
    }

    i = row - 1
    j = col + 1
    while(i >= 0 && j < N) {
        if( playBoardArray[i][j] == 0 ) {
            playBoardArray[i][j] = 2;
        }
        i--;
        j++;
    }

    i = row + 1
    j = col - 1
    while(i < N && j >= 0) {
        if( playBoardArray[i][j] == 0 ) {
            playBoardArray[i][j] = 2;
        }
        i++;
        j--;
    }
}

function checkVictory() {
    var total = 0;
    for(var i=0; i<N; i++) {
        for(var j=0; j<N; j++) {
            if( playBoardArray[i][j] == 1 ) {
                total++;
            }
        }
    }
    if( total == N ) {
        playChessCtx.fillStyle = "rgba(255, 60, 20, 0.5)";
        var vText = "Super!";
        var textWidth = parseInt(playChessCtx.measureText(vText).width);
        playChessCtx.fillText(vText, width/2-textWidth/2, height/2);
    }
}

function reset() {
    resetBoard(playBoardArray);

    playChessCtx.clearRect(0, 0, width, height);
    drawCheckerBoard(playChessCtx);

    drawBoardValues();
}
