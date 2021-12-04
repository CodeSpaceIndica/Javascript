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

var numMovesToVictory = 0;

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
    setNeighbours(boxes);

    theCanvas.addEventListener("mousemove", function(event) {
        if( isGameOver(boxes) ) {
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
        if( isGameOver(boxes) ) {
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

    let bestScore = -Infinity;
    let leastMoves = Infinity
    let bestRow  = -1;
    let bestCol  = -1;
    let bestSide = -1;
    //We'll copy the contents of the game board to a new copy
    //That way we won't pollute the existing board.
    let boxesCopy = cloneBoxes(boxes);
    setNeighbours(boxesCopy);
    for(let i=0; i<boxesCopy.length; i++) {
        for(let j=0; j<boxesCopy[i].length; j++) {
            if( !boxesCopy[i][j].complete ) {
                if( !boxesCopy[i][j].top ) {
                    numMovesToVictory = 0;
    
                    boxesCopy[i][j].doMove(1, COMPUTER_PLAYER);
                    let score = minimax(boxesCopy, false, 0);
                    boxesCopy[i][j].undoMove(1);
                    if( score > 0 && leastMoves > numMovesToVictory ) {
                        leastMoves = numMovesToVictory;
                        score += 10/numMovesToVictory;//Arbitary.
                    }
                    if( score > bestScore ) {
                        bestScore = score;
                        bestRow = i;
                        bestCol = j;
                        bestSide = 1;
                    }
                }
                if( !boxesCopy[i][j].right ) {
                    numMovesToVictory = 0;

                    boxesCopy[i][j].doMove(2, COMPUTER_PLAYER);
                    let score = minimax(boxesCopy, false, 0);
                    boxesCopy[i][j].undoMove(2);
                    if( score > 0 && leastMoves > numMovesToVictory ) {
                        leastMoves = numMovesToVictory;
                        score += 10/numMovesToVictory;//Arbitary.
                    }
                    if( score > bestScore ) {
                        bestScore = score;
                        bestRow = i;
                        bestCol = j;
                        bestSide = 2;
                    }
                }
                if( !boxesCopy[i][j].bottom ) {
                    numMovesToVictory = 0;

                    boxesCopy[i][j].doMove(3, COMPUTER_PLAYER);
                    let score = minimax(boxesCopy, false, 0);
                    boxesCopy[i][j].undoMove(3);
                    if( score > 0 && leastMoves > numMovesToVictory ) {
                        leastMoves = numMovesToVictory;
                        score += 10/numMovesToVictory;//Arbitary.
                    }
                    if( score > bestScore ) {
                        bestScore = score;
                        bestRow = i;
                        bestCol = j;
                        bestSide = 3;
                    }
                }
                if( !boxesCopy[i][j].left ) {
                    numMovesToVictory = 0;

                    boxesCopy[i][j].doMove(4, COMPUTER_PLAYER);
                    let score = minimax(boxesCopy, false, 0);
                    boxesCopy[i][j].undoMove(4);
                    if( score > 0 && leastMoves > numMovesToVictory ) {
                        leastMoves = numMovesToVictory;
                        score += 10/numMovesToVictory;//Arbitary.
                    }
                    if( score > bestScore ) {
                        bestScore = score;
                        bestRow = i;
                        bestCol = j;
                        bestSide = 4;
                    }
                }
            }
        }
    }

    console.log(bestRow, bestCol, "Side :" + bestSide, "Score :" + bestScore);
    let completedThisMove = boxes[bestRow][bestCol].doMove(bestSide, COMPUTER_PLAYER);
    render();

    if( isGameOver(boxes) ) {
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
    //Minimum depth should be 3
    if( depth > 3 ) {
        let result = whoHasMore(boxesSet);
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

    //Find out if the board is done. If it is done, return 
    //1 if the computer wins, -1 if the human wins and 0 for draw.
    if ( isGameOver(boxesSet) ) {
        let result = whoHasMore(boxesSet);
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
                //If the place on the board is empty, 
                //then place a piece on it and call (recursion)
                //minimax on it.
                if ( !boxesSet[i][j].complete ) {
                    if( !boxesSet[i][j].top ) {
                        boxesSet[i][j].doMove(1, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
                        boxesSet[i][j].undoMove(1);
                        bestScore = Math.max(score, bestScore);
                    }
                    if( !boxesSet[i][j].right ) {
                        boxesSet[i][j].doMove(2, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
                        boxesSet[i][j].undoMove(2);
                        bestScore = Math.max(score, bestScore);
                    }
                    if( !boxesSet[i][j].bottom ) {
                        boxesSet[i][j].doMove(3, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
                        boxesSet[i][j].undoMove(3);
                        bestScore = Math.max(score, bestScore);
                    }
                    if( !boxesSet[i][j].left ) {
                        boxesSet[i][j].doMove(4, COMPUTER_PLAYER);
                        let score = minimax(boxesSet, false, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
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
                //If the place on the board is empty, 
                //then place a piece on it and call (recursion)
                //minimax on it.
                if ( !boxesSet[i][j].complete ) {
                    if( !boxesSet[i][j].top  ) {
                        boxesSet[i][j].doMove(1, HUMAN_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
                        boxesSet[i][j].undoMove(1);
                        bestScore = Math.min(score, bestScore);
                    }
                    if( !boxesSet[i][j].right  ) {
                        boxesSet[i][j].doMove(2, HUMAN_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
                        boxesSet[i][j].undoMove(2);
                        bestScore = Math.min(score, bestScore);
                    }
                    if( !boxesSet[i][j].bottom  ) {
                        boxesSet[i][j].doMove(3, HUMAN_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
                        boxesSet[i][j].undoMove(3);
                        bestScore = Math.min(score, bestScore);
                    }
                    if( !boxesSet[i][j].left  ) {
                        boxesSet[i][j].doMove(4, HUMAN_PLAYER);
                        let score = minimax(boxesSet, true, depth+1);
                        let whm = whoHasMore(boxesSet);
                        if( whm == HUMAN_PLAYER ) {
                            score--;
                        }
                        else if( whm == COMPUTER_PLAYER ) {
                            score++;
                        }
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

    if( isGameOver(boxes) ) {
        let result = whoHasMore(boxes);
        result = result != DRAW ? result + " won" : DRAW;
        updateStatus("Game Over", "", result);
        return;
    }
}

/**
 * A function that checks if the game is done/
 * Will return either true or false.
  * 
 * @param {*} boxSet 
 * @returns 
 */
 function isGameOver(boxSet) {
    for(let i=0; i<boxSet.length; i++) {
        for(let j=0; j<boxSet[i].length; j++) {
            if( !boxSet[i][j].complete ) {
                return false;
            }
        }
    }
    return true;
}

/**
 * A function that returns who has more boxes.
 * 
 * @param {*} boxSet 
 * @returns 
 */
function whoHasMore(boxSet) {
    let players = {
        "Human": 0,
        "Computer": 0,
    };
    for(let i=0; i<boxSet.length; i++) {
        for(let j=0; j<boxSet[i].length; j++) {
            if( boxSet[i][j].complete ) {
                players[boxSet[i][j].completedBy]++;
            }
        }
    }
    if( players[COMPUTER_PLAYER] > players[HUMAN_PLAYER] ) {
        return COMPUTER_PLAYER;
    }
    else if( players[COMPUTER_PLAYER] < players[HUMAN_PLAYER] ) {
        return HUMAN_PLAYER;
    }
    return DRAW;
}

function updateStatus(status, currPlayer, whoWon) {
    statusDiv.innerHTML = status;
    currPlyrDiv.innerHTML = currPlayer;
    resultDiv.innerHTML = whoWon;
}

function setNeighbours(boxesSet) {
    for(let i=0; i<boxesSet.length; i++) {
        for(let j=0; j<boxesSet[i].length; j++) {
            let t = undefined;
            let r = undefined;
            let b = undefined;
            let l = undefined;

            if( i-1 >= 0 ) {
                t = boxesSet[i-1][j];
            }
            if( j+1 <= boxesSet[i].length-1 ) {
                r = boxesSet[i][j+1];
            }
            if( i+1 <= boxesSet.length-1 ) {
                b = boxesSet[i+1][j];
            }
            if( j-1 >= 0 ) {
                l = boxesSet[i][j-1];
            }

            boxesSet[i][j].setNeighbours(t, r, b, l);
        }
    }
}

function cloneBoxes(boxSet) {
    let clonedBoxes = new Array();

    for(let i=0; i<boxSet.length; i++) {
        clonedBoxes[i] = new Array(boxSet[i].length);
        for(let j=0; j<boxSet[i].length; j++) {
            clonedBoxes[i][j] = boxSet[i][j].clone();
        }
    }

    return clonedBoxes;
}
