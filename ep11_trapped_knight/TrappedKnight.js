var width = 800;
var height = 800;

var tkCtx;

//Must always be an odd number
var arraySize = 61;
var maxN = arraySize*arraySize;
var squareSize;

var spiralArray = [];
var idxI, idxJ;
var n = 1; //Running counter.

var knightMoves = [
    [-2,-1], [-2,1],
    [-1,-2], [-1,2],
    [1,-2], [1,2],
    [2,-1], [2,1]
];

var visitedNumbers = [];
var positions = [];

var ctr = 0;
var prevX, prevY;
var hue, incrHue;

/**
 * A function that fills the spiralArray with numbers in a spiral sequence.
 */
function fillSpiralArray() {
    for(var i=0; i<arraySize; i++) {
        var innerArray = [];
        for(var j=0; j<arraySize; j++) {
            innerArray.push(0);
        }
        spiralArray.push(innerArray);
    }
    
    idxI = parseInt(arraySize/2);
    idxJ = parseInt(arraySize/2);
    spiralArray[idxI][idxJ] = n;
    putTextAtIndex(idxI, idxJ, n);
    n++;

    var startI = 1;
    var startJ = -1;

    var incrI = 1;
    var incrJ = -1;
    do {
        var iRange = range(startI);
        for(idx in iRange) {
            idxI += incrI;
            spiralArray[idxI][idxJ] = n;
            //putTextAtIndex(idxI, idxJ, n);
            n++;
        }

        iRange = range(startJ);
        for(idx in iRange) {
            idxJ += incrJ;
            spiralArray[idxI][idxJ] = n;
            //putTextAtIndex(idxI, idxJ, n);
            n++;
        }

        if( startI > 0 ) {
            startI++;
        }
        else {
            startI--;
        }
        startI *= -1;

        if( startJ > 0 ) {
            startJ++;
        }
        else {
            startJ--;
        }
        startJ *= -1;

        incrI *= -1;
        incrJ *= -1;

    } while( n < maxN );
}

/**
 * Given an index of a double dimensional array, give its X and Y co-ords
 */
function getPosition(i, j) {
    var x = squareSize * i;
    var y = squareSize * j;

    return [x, y];
}

/**
 * draw text at a given index of the checker-board.
 * @param {*} i 
 * @param {*} j 
 * @param {*} text 
 */
function putTextAtIndex(i, j, text) {
    tkCtx.fillStyle = "#000000";
    var pos = getPosition(i, j);
    tkCtx.fillText(text, pos[0]+(squareSize/2), pos[1]+(squareSize/2));
}

/**
 * A range function, just like in Python.
 * 
 * @param {*} max 
 */
function range(max) {
    var returnArray = [];
    if( max > 0 ) {
        for(var i=0; i<max; i++) {
            returnArray.push(i);
        }
    }
    else if( max < 0 ) {
        for(var i=0; i>max; i--) {
            returnArray.push(i);
        }
    }

    return returnArray;
}

/**
 * Given an index of a double dimensional array, returns the next 
 * knight position which is lowest and has not been visited.
 * 
 * @param {*} iIndex 
 * @param {*} jIndex 
 */
function getNextKnightLocation(iIndex, jIndex) {
    var theNumber = 999999;
    var foundI = -200;
    var foundJ = -200;
    for(idx in knightMoves) {
        var offset = knightMoves[idx];
        var iii = iIndex+offset[0];
        var jjj = jIndex+offset[1];
        if( iii > arraySize-1 || jjj > arraySize-1 || iii < 0 || jjj < 0 ) {
            break;
        }
        var numAtLocation = spiralArray[iii][jjj];
        if( numAtLocation < theNumber && !visitedNumbers.includes(numAtLocation) ) {
            theNumber = numAtLocation;
            foundI = iii;
            foundJ = jjj;
        }
    }

    return [theNumber, foundI, foundJ];
}

/**
 * Moves the knight starting from the center until there 
 * are no available moves.
 */
function trapKnight() {
    idxI = parseInt(arraySize/2);
    idxJ = parseInt(arraySize/2);
    visitedNumbers.push(1);

    var p = getPosition(idxI, idxJ);
    var pos = new Point(p[0], p[1]);
    positions.push(pos);
   
    do {
        var ret = getNextKnightLocation(idxI, idxJ);
        var nextNumber = ret[0];
        if( nextNumber != 999999 ) {
            visitedNumbers.push(nextNumber);
            idxI = ret[1];
            idxJ = ret[2];

            p = getPosition(idxI, idxJ);
            pos = new Point(p[0], p[1]);
            positions.push(pos);
        }
        else {
            break;
        }
    } while(true);

    tkCtx.lineWidth = 3;

    prevX = positions[0].x;
    prevY = positions[0].y;
    hue = 0.01;
    incrHue = 1 / positions.length;

    animateMoves();

    // var rgb = HSLtoRGB(hue, 1, 0.5);
    // tkCtx.strokeStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";    
    // for(idx in positions) {
    //     var newPos = positions[idx];

    //     var rgb = HSLtoRGB(hue, 1, 0.5);
    //     tkCtx.strokeStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";    

    //     tkCtx.beginPath();
    //     tkCtx.moveTo(prevX, prevY);
    //     tkCtx.lineTo(newPos.x, newPos.y);
    //     tkCtx.stroke();

    //     prevX = newPos.x;
    //     prevY = newPos.y;

    //     hue += incrHue;
    // }
}

/**
 * Animates the moves.
 */
function animateMoves() {
    var newPos = positions[ctr];

    var rgb = HSLtoRGB(hue, 1, 0.5);
    tkCtx.strokeStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";    

    tkCtx.beginPath();
    tkCtx.moveTo(prevX, prevY);
    tkCtx.lineTo(newPos.x, newPos.y);
    tkCtx.stroke();

    prevX = newPos.x;
    prevY = newPos.y;

    hue += incrHue;

    ctr++;
    if( ctr > positions.length-1 ) {
        tkCtx.fillStyle = "#FF0000";
        tkCtx.beginPath();
        tkCtx.arc(newPos.x, newPos.y, 5, 0, Math.PI*2, true);
        tkCtx.fill();

        return;
    }

    requestAnimationFrame(animateMoves);
}

/**
 * Draw checkerboard 
 */
function drawCheckerBoard() {
    squareSize = width / arraySize;

    var startX = 0;
    var startY = 0;
    tkCtx.strokeStyle = "rgba(1, 1, 1, 0)";
    for(var i=0; i<arraySize; i++) {
        for(var j=0; j<arraySize; j++) {
            if( (i+j) % 2 == 0 ) {
                tkCtx.fillStyle = "rgba(118,150,86, 0.1)";
            }
            else {
                tkCtx.fillStyle = "rgba(238,238,210, 0.1)";
            }
            tkCtx.beginPath();
            tkCtx.rect(startX, startY, squareSize, squareSize);
            tkCtx.fill();
            startX += squareSize;
        }
        startX = 0;
        startY += squareSize;
    }
}

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("trappedKnightCanvas");
    tkCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    tkCtx.font = "20px Mono";

    drawCheckerBoard();

    try {
        fillSpiralArray();
    }
    catch(exp) {
        //Dont do anything... the array is full.
    }

    trapKnight();
}
