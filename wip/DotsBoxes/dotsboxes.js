//Constants
const NUMBER_OF_BOXES = 3; //<-- Although this can  be even, making this an odd number will ensure a victor each time.
const PADDING         = 30;
const HUMAN_PLAYER    = "Human"
const COMPUTER_PLAYER = "Computer"
const DRAW            = "Draw"

//GLOBALS
var ctx;
var width, height;

var boxes = new Array();

var currentPlayer = HUMAN_PLAYER;

var statusDiv, currPlyrDiv, resultDiv;

function animInit() {
    let theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

    width = theCanvas.width;
    height = theCanvas.height;
    
    statusDiv = document.getElementById("status");
    currPlyrDiv = document.getElementById("currPlyr");
    resultDiv = document.getElementById("result");

    //Initialize
    let x = PADDING;
    let y = PADDING;
    let w = (width - (PADDING*2)) / NUMBER_OF_BOXES;
    let h = (height - (PADDING*2)) / NUMBER_OF_BOXES;
    for(let i=0; i<NUMBER_OF_BOXES; i++) {
        boxes[i] = new Array(NUMBER_OF_BOXES)
        for(let j=0; j<NUMBER_OF_BOXES; j++) {
            let aBox = new Box(x, y, w, h);
            boxes[i][j] = aBox;

            x += w;
        }
        x = PADDING;
        y += h;
    }

    let fontSize = parseInt(w / 5);
    fontSize = fontSize < 12 ? 12 : fontSize;
    ctx.font = fontSize + "px sans-Serif";

    //Set Neighbours
    for(let i=0; i<NUMBER_OF_BOXES; i++) {
        for(let j=0; j<NUMBER_OF_BOXES; j++) {
            let t = undefined;
            let r = undefined;
            let b = undefined;
            let l = undefined;

            if( i-1 >= 0 ) {
                t = boxes[i-1][j];
            }
            if( j+1 <= NUMBER_OF_BOXES-1 ) {
                r = boxes[i][j+1];
            }
            if( i+1 <= NUMBER_OF_BOXES-1 ) {
                b = boxes[i+1][j];
            }
            if( j-1 >= 0 ) {
                l = boxes[i][j-1];
            }

            boxes[i][j].setNeighbours(t, r, b, l);
        }
    }

    theCanvas.addEventListener("mousemove", function(event) {
        if( isGameOver(boxes) != null ) {
            return;
        }
        render();
        let mLoc = getRealMousePosition(event, theCanvas);
        let mX = mLoc.x;
        let mY = mLoc.y;
        for(let i=0; i<boxes.length; i++) {
            for(let j=0; j<boxes[i].length; j++) {
                let aBox = boxes[i][j];
                aBox.checkMouseMovement(mX, mY, ctx);
            }
        }
    });

    theCanvas.addEventListener("click", function(event) {
        if( currentPlayer == COMPUTER_PLAYER ) {
            return;
        }
        let mLoc = getRealMousePosition(event, theCanvas);
        let mX = mLoc.x;
        let mY = mLoc.y;
        let doneHumanMove = false;
        for(let i=0; i<boxes.length; i++) {
            for(let j=0; j<boxes[i].length; j++) {
                let aBox = boxes[i][j];
                let whichSide = aBox.checkClick(mX, mY);
                if( whichSide != 0 ) {
                    let completedThisMove = aBox.doMove(whichSide, HUMAN_PLAYER);
                    //If the human just completed a move, then
                    //its still the human's move.
                    if( completedThisMove ) {
                        currentPlayer = HUMAN_PLAYER;
                    }
                    else {
                        currentPlayer = COMPUTER_PLAYER;
                        doneHumanMove = true;
                    }
                    break;
                }
            }
        }
        if( isGameOver(boxes) != null ) {
            render();
            return;
        }
        if( doneHumanMove ) {
            updateStatus("Playing", currentPlayer, "");
            //DO Computer move
            setTimeout(function() {
                doComputerMove();
            }, 200);
        }
        render();
    });

    updateStatus("Playing", currentPlayer, "");
    render();
}

function resetBoard() {
    currentPlayer = HUMAN_PLAYER;
    for(let i=0; i<boxes.length; i++) {
        for(let j=0; j<boxes[i].length; j++) {
            boxes[i][j].reset();
        }
    }

    updateStatus("Playing", currentPlayer, "");
    render();
}

function doComputerMove() {
    if( currentPlayer == HUMAN_PLAYER ) {
        return;
    }
    let row = 0, col = 0, whichSide = 0;
    let moveAvailable = true;
    do {
        row = parseInt( randomBetween(0, NUMBER_OF_BOXES) );
        col = parseInt( randomBetween(0, NUMBER_OF_BOXES) );
        whichSide = parseInt( randomBetween(1, 5) );
        moveAvailable = true;
        if( whichSide == 1 && boxes[row][col].top ) {
            moveAvailable = false;
        }
        else if( whichSide == 2 && boxes[row][col].right ) {
            moveAvailable = false;
        }
        else if( whichSide == 3 && boxes[row][col].bottom ) {
            moveAvailable = false;
        }
        else if( whichSide == 4 && boxes[row][col].left ) {
            moveAvailable = false;
        }
    } while( !moveAvailable );

    let completedThisMove = boxes[row][col].doMove(whichSide, COMPUTER_PLAYER);
    render();

    if( isGameOver(boxes) != null ) {
        return;
    }

    //If the computer just completed a move, do it again.
    if( completedThisMove ) {
        currentPlayer = COMPUTER_PLAYER;
        //DO Computer move
        setTimeout(function() {
            doComputerMove();
        }, 200);
    }
    else {
        currentPlayer = HUMAN_PLAYER;
    }
    updateStatus("Playing", currentPlayer, "");
}

function minimax(boxesSet, isMaximizing, depth) {
    numMovesToVictory++;
    //return a draw score if we have reached the target depth
    //for now we allow for maximum depth of 7.
    if( depth > 7 ) {
        return 0;
    }
    //Find out if the board is done. If it is done, return 
    //1 if the computer wins, -1 if the human wins and 0 for draw.
    let result = isGameOver(boxSet);
    if (result != null) {
        if( result == DRAW ) {
            return 0;
        }
        else if( result == COMPUTER_PLAYER ) {//Computer
            return 1;
        }
        else if( result == HUMAN_PLAYER ) {//Human
            return -1;
        }
    }

    //If the computer moves
    if ( isMaximizing ) {
        let bestScore = -Infinity;
        for (let i=0; i<boxesSet.length; i++) {
            for (let j=0; j<boxesSet[i].length; j++) {
                //TO DO
                //If the place on the board is empty, 
                //then place a piece on it and call (recursion)
                //minimax on it.
                if ( !boxesSet[i][j].complete ) {
                    if( !boxesSet[i][j].top  ) {
                        boxesSet[i][j].doMove(1, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        boxesSet[i][j].undoMove(1);
                        bestScore = Math.max(score, bestScore);
                    }
                    else if( !boxesSet[i][j].right  ) {
                        boxesSet[i][j].doMove(2, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        boxesSet[i][j].undoMove(2);
                        bestScore = Math.max(score, bestScore);
                    }
                    else if( !boxesSet[i][j].bottom  ) {
                        boxesSet[i][j].doMove(3, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        boxesSet[i][j].undoMove(3);
                        bestScore = Math.max(score, bestScore);
                    }
                    else if( !boxesSet[i][j].left  ) {
                        boxesSet[i][j].doMove(4, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        boxesSet[i][j].undoMove(4);
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
        }
        return bestScore;
    } 
    //Play for the human.
    else {
        let bestScore = Infinity;
        for (let i=0; i<boxesSet.length; i++) {
            for (let j=0; j<boxesSet[i].length; j++) {
                //TO DO
                //If the place on the board is empty, 
                //then place a piece on it and call (recursion)
                //minimax on it.
                if ( !boxesSet[i][j].complete ) {
                    if( !boxesSet[i][j].top  ) {
                        boxesSet[i][j].doMove(1, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        boxesSet[i][j].undoMove(1);
                        bestScore = Math.min(score, bestScore);
                    }
                    else if( !boxesSet[i][j].right  ) {
                        boxesSet[i][j].doMove(2, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        boxesSet[i][j].undoMove(2);
                        bestScore = Math.min(score, bestScore);
                    }
                    else if( !boxesSet[i][j].bottom  ) {
                        boxesSet[i][j].doMove(3, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        boxesSet[i][j].undoMove(3);
                        bestScore = Math.min(score, bestScore);
                    }
                    else if( !boxesSet[i][j].left  ) {
                        boxesSet[i][j].doMove(4, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        boxesSet[i][j].undoMove(4);
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
        }
        return bestScore;
    }
}

function render() {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();
 
    for(let i=0; i<boxes.length; i++) {
        for(let j=0; j<boxes[i].length; j++) {
            let aBox = boxes[i][j];
            aBox.render(ctx);
        }
    }

    let result = isGameOver(boxes);
    if( result != null ) {
        updateStatus("Game Over", "", result + " won");
        return;
    }
}

/**
 * A function that checks if the game is done and who has won.
 * Will return one of three values
 * 1. HUMAN
 * 2. COMPUTER
 * 3. DRAW
 * 
 * returns null if game not over.
 * 
 * @param {*} boxSet 
 * @returns 
 */
function isGameOver(boxSet) {
    let players = {
        "Human": 0,
        "Computer": 0,
    };
    for(let i=0; i<boxSet.length; i++) {
        for(let j=0; j<boxSet[i].length; j++) {
            if( boxSet[i][j].complete ) {
                players[boxes[i][j].completedBy]++;
            }
            else {
                return null;
            }
        }
    }

    if( players[COMPUTER_PLAYER] > players[HUMAN_PLAYER] ) {
        return COMPUTER_PLAYER;
    }
    else if( players[COMPUTER_PLAYER] < players[HUMAN_PLAYER] ) {
        return HUMAN_PLAYER;
    }
    else {
        return DRAW;
    }
}

function updateStatus(status, currPlayer, whoWon) {
    statusDiv.innerHTML = status;
    currPlyrDiv.innerHTML = currPlayer;
    resultDiv.innerHTML = whoWon;
}

function cloneBoxes(boxSet) {
    let clonedBoxes = new Array();

    for(let i=0; i<boxSet.length; i++) {
        cloneBoxes[i] = new Array(boxSet[i].length);
        for(let j=0; j<boxSet[i].length; j++) {
            cloneBoxes[i][j] = boxSet[i][j].clone();
        }
    }

    return clonedBoxes;
}