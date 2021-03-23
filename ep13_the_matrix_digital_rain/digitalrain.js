var width, height;

var drCtx;

var charSize = 15;
var colCount, rowCount;
var charArray;
var highLightArray;

var fadeSteps = 40;
var startRed = 164;
var startGrn = 255;
var startBlu = 130;
//Array of hexadecimal colors example #FF77DD
var fadeColorArray;

var hSize = 30;
var hCol = new Array(hSize);
var hRow = new Array(hSize);

var katakanaChars = ["\u30A1", "\u30A2", "\u30A3", "\u30A4", "\u30A5", "\u30A6", "\u30A7", "\u30A8", "\u30A9",
                     "\u30B1", "\u30B2", "\u30B3", "\u30B4", "\u30B5", "\u30B6", "\u30B7", "\u30B8", "\u30B9",
                     "\u30D1", "\u30D2", "\u30D3", "\u30D4", "\u30D5", "\u30D6", "\u30D7", "\u30D8", "\u30D9",
                     "\u30E1", "\u30E2", "\u30E3", "\u30E4", "\u30E5", "\u30E6", "\u30E7", "\u30E8", "\u30E9",
                     "\u30F1", "\u30F2", "\u30F3", "\u30F4", "\u30F5", "\u30F6", "\u30F7", "\u30F8", "\u30F9"];

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("digirainCanvas");
    resizeCanvas(canvasElement, false);
    drCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    charSize = parseInt(width / 85);
    hSize = parseInt(width / 43);

    drCtx.font = "bold " + charSize + "px Mono";

    fadeColorArray = new Array(fadeSteps);
    var decrClr = parseInt( startGrn / fadeSteps);
    for(var i=0; i<fadeSteps; i++) {
        var colr = "#" + toHex(startRed) + toHex(startGrn) + toHex(startBlu);

        startRed -= decrClr;
        startRed = startRed  < 0 ? 0 : startRed;

        startGrn -= decrClr;
        startGrn = startGrn  < 0 ? 0 : startGrn;

        startBlu -= decrClr;
        startBlu = startBlu  < 0 ? 0 : startBlu;

        fadeColorArray[i] = colr;
    }

    colCount = parseInt( Math.ceil( width / charSize ) );
    rowCount = parseInt( Math.ceil( height / charSize ) );
    charArray = new Array(colCount);
    highLightArray = new Array(colCount);
    for(var i=0; i<colCount; i++) {
        charArray[i] = new Array(rowCount);
        highLightArray[i] = new Array(colCount);
        for(var j=0; j<rowCount; j++) {
            var rIndex = parseInt( randomBetween(0, katakanaChars.length-1) );
            charArray[i][j] = katakanaChars[rIndex];
            highLightArray[i][j] = -999;
        }
    }

    for(var i=0; i<hSize; i++) {
        hCol[i] = parseInt( Math.floor(randomBetween(0, colCount-1)) );
        hRow[i] = parseInt( Math.floor(randomBetween(0, rowCount/2)) );
    }

    renderDigitalRain();
}

function renderDigitalRain() {
    drCtx.fillStyle = "#000000";
    drCtx.beginPath();
    drCtx.fillRect(0, 0, width, height);
    drCtx.fill();

    for(var i=0; i<colCount; i++) {
        for(var j=0; j<rowCount; j++) {
            if( highLightArray[i][j] == -999 ) {
                drCtx.fillStyle = "#000000";
            }
            else {
                drCtx.fillStyle = fadeColorArray[highLightArray[i][j]];
            }
            var x = i * charSize;
            var y = j * charSize;
            drCtx.fillText(charArray[i][j], x, y);
        }
    }

    for(var i=0; i<150; i++) {
        var rI = parseInt( Math.floor(randomBetween(0, colCount-1)) );
        var rJ = parseInt( Math.floor(randomBetween(0, rowCount-1)) );
        var rIndex = parseInt( randomBetween(0, katakanaChars.length-1) );
        charArray[rI][rJ] = katakanaChars[rIndex];
    }

    for(var i=0; i<colCount; i++) {
        for(var j=0; j<rowCount; j++) {
            if( highLightArray[i][j] != -999 ) {
                highLightArray[i][j]++;
                if( highLightArray[i][j] > fadeColorArray.length -1) {
                    highLightArray[i][j] = -999;
                }
            }
        }
    }

    highlightColumn();

    //setTimeout(renderDigitalRain, 50);
    requestAnimationFrame(renderDigitalRain);
}

function highlightColumn() {
    for(var i=0; i<hSize; i++) {
        highLightArray[hCol[i]][hRow[i]] = 0;
        hRow[i]++;
        if( hRow[i] > rowCount - 1) {
            hCol[i] = parseInt( Math.floor(randomBetween(0, colCount-1)) );
            hRow[i] = parseInt( Math.floor(randomBetween(0, rowCount/2)) );
        }
    }
}
