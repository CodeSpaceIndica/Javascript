//Constants
const NUMBER_OF_BOXES = 7;
const PADDING = 30;
const HUMAN_PLAYER = "Human"
const COMPUTER_PLAYER = "Computer"

//GLOBALS
var ctx;
var width, height;

var boxes = new Array();

var players = {
    "Human": 0,
    "Computer": 0,
};

var currentPlayer = HUMAN_PLAYER;

var statusDiv, currPlyrDiv, resultDiv;

function animInit() {
    var theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

    width = theCanvas.width;
    height = theCanvas.height;
    
    ctx.font = "20px sans-Serif";

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
        if( isGameOver() ) {
            return;
        }
        let mLoc = getRealMousePosition(event, theCanvas);
        let mX = mLoc.x;
        let mY = mLoc.y;
        for(let i=0; i<boxes.length; i++) {
            for(let j=0; j<boxes[i].length; j++) {
                let aBox = boxes[i][j];
                aBox.checkMouseMovement(mX, mY);
            }
        }
        render();
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
                if( aBox.checkClick(mX, mY, HUMAN_PLAYER) ) {
                    //If the human just completed a move, then
                    //its still the human's move.
                    console.log(i, j, aBox.complete);
                    if( aBox.complete ) {
                        currentPlayer = HUMAN_PLAYER;
                    }
                    else {
                        currentPlayer = COMPUTER_PLAYER;
                        doneHumanMove = true;
                    }
                }
            }
        }
        console.log(currentPlayer);
        if( isGameOver() ) {
            doGameOver();
            render();
            return;
        }
        if( doneHumanMove ) {
            updateStatus("Playing", currentPlayer, "");
            //DO COmputer move
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
            boxes[i][j].top    = false;
            boxes[i][j].right  = false;
            boxes[i][j].bottom = false;
            boxes[i][j].left   = false;
    
            boxes[i][j].hTop    = false;
            boxes[i][j].hRight  = false;
            boxes[i][j].hBottom = false;
            boxes[i][j].hLeft   = false;
    
            boxes[i][j].complete = false;
            boxes[i][j].completedBy = "";
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

    boxes[row][col].doMove(whichSide, COMPUTER_PLAYER);
    render();

    if( isGameOver() ) {
        return;
    }

    //If the computer just completed a move, do it again.
    if( boxes[row][col].complete ) {
        currentPlayer = COMPUTER_PLAYER;
        //DO COmputer move
        setTimeout(function() {
            doComputerMove();
        }, 200);
    }
    else {
        currentPlayer = HUMAN_PLAYER;
    }
    console.log(currentPlayer);
    updateStatus("Playing", currentPlayer, "");
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

    if( isGameOver() ) {
        doGameOver();
        return;
    }
}

function isGameOver() {
    for(let i=0; i<boxes.length; i++) {
        for(let j=0; j<boxes[i].length; j++) {
            if( !boxes[i][j].complete ) {
                return false;
            }
        }
    }

    return true;
}

function doGameOver() {
    players = {
        "Human": 0,
        "Computer": 0,
    };
    for(let i=0; i<boxes.length; i++) {
        for(let j=0; j<boxes[i].length; j++) {
            if( boxes[i][j].complete ) {
                players[boxes[i][j].completedBy]++;
            }
        }
    }
    //console.log("Game over", players);
    if( players[COMPUTER_PLAYER] > players[HUMAN_PLAYER] ) {
        //console.log(COMPUTER_PLAYER + " won with " + players[COMPUTER_PLAYER] + " boxes");
        updateStatus("Game Over", "", COMPUTER_PLAYER + " won with " + players[COMPUTER_PLAYER] + " boxes");
    }
    else if( players[COMPUTER_PLAYER] < players[HUMAN_PLAYER] ) {
        //console.log(HUMAN_PLAYER + " won with " + players[HUMAN_PLAYER] + " boxes");
        updateStatus("Game Over", "", HUMAN_PLAYER + " won with " + players[HUMAN_PLAYER] + " boxes");
    }
    else {
        updateStatus("Game Over", "", "Draw.");
    }
}

function updateStatus(status, currPlayer, whoWon) {
    statusDiv.innerHTML = status;
    currPlyrDiv.innerHTML = currPlayer;
    resultDiv.innerHTML = whoWon;
}