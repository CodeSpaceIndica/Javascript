//Constants
//Count of number of rows and columns
const COUNT = 5;

var width, height;

var ctx;

var rowSize, colSize;

var colorArr = {
    1: [255, 0, 0],
    2: [0, 255, 0],
    3: [0, 0, 255],
    4: [0, 255, 255],
    5: [255, 0, 255],
    6: [255, 255, 0],
};
var drenchArr = [];

var clickCount = 0;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    rowSize = height / COUNT;
    colSize = width / COUNT;

    let fontSize = parseInt( width / 40 );
    ctx.font = fontSize + "px Monospace";

    for(let i=0; i<COUNT; i++) {
        let innerArr = [];
        for(let j=0; j<COUNT; j++) {
            let rndVal = parseInt( randomBetween(1, 7) );
            rndVal *= -1;
            innerArr.push( rndVal );
        }
        drenchArr.push(innerArr);
    }

    drenchArr[0][0] *= -1;
    //If there are any negative values touching the 
    //positive values but are the same... then make them positive too.
    for(let ii=0; ii<COUNT; ii++) {
        for(let jj=0; jj<COUNT; jj++) {
            if( drenchArr[ii][jj] > 0 ) {
                //Top
                if( ii >= 1 && drenchArr[ii-1][jj] < 0 
                    && drenchArr[ii][jj] == Math.abs(drenchArr[ii-1][jj]) ) {
                    drenchArr[ii-1][jj] *= -1;
                }
                //Right
                if( jj <= drenchArr[ii].length-2 && drenchArr[ii][jj+1] < 0
                    && drenchArr[ii][jj] == Math.abs(drenchArr[ii][jj+1]) ) {
                        drenchArr[ii][jj+1] *= -1;
                }
                //Bottom
                if( ii <= drenchArr.length-2 && drenchArr[ii+1][jj] < 0 
                    && drenchArr[ii][jj] == Math.abs(drenchArr[ii+1][jj]) ) {
                        drenchArr[ii+1][jj] *= -1;
                }
                //Left
                if( jj >= 1 && drenchArr[ii][jj-1] < 0
                    && drenchArr[ii][jj] == Math.abs(drenchArr[ii][jj-1]) ) {
                        drenchArr[ii][jj-1] *= -1;
                }
            }
        }
    }

    addEvents(canvasElement);

    drawDrenchBoard();
});

function drawDrenchBoard() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let x = 0;
    let y = 0;
    ctx.strokeStyle = "#000000";

    let isGameOver = true;

    for(let i=0; i<COUNT; i++) {
        for(let j=0; j<COUNT; j++) {
            rgb = colorArr[ Math.abs(drenchArr[i][j]) ];
            drawPiece(x, y, colSize, rowSize, rgb[0], rgb[1], rgb[2]);

            // ctx.fillStyle = "#000000";
            // ctx.beginPath();
            // ctx.fillText(drenchArr[i][j], x+colSize/2, y+rowSize/2);

            if( drenchArr[i][j] < 0 ) {
                isGameOver = false;
            }

            x += colSize;
        }
        x = 0;
        y += rowSize;
    }

    //Check if game is over
    if( isGameOver ) {
        console.log("GAME IS OVER");
    }
}

function drawPiece(x, y, w, h, r, g, b) {
    ctx.lineWidth = 4;

    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",1.0)";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+w, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+h);
    ctx.stroke();

    ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + ",0.6)";
    ctx.beginPath();
    ctx.moveTo(x+w, y);
    ctx.lineTo(x+w, y+h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+w, y+h);
    ctx.lineTo(x, y+h);
    ctx.stroke();

    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",0.8)";
    ctx.beginPath();
    ctx.rect(x+2, y+2, w-5, h-5);
    ctx.fill();
}