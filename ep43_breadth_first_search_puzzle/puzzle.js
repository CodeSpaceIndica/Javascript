//GLOBALS
var ctx;
var width, height;

var gridItemSize = 20;
var rows = 40, cols = 40;

var gridItems = new Array();

var graph = new Graph();

var solvedPath;
var sIdx;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");
    ctx.lineWidth=4;

    let x = 0;
    let y = 0;
    let idNumber = 1;
    for(let i=0; i<rows; i++) {
        for(let j=0; j<rows; j++) {
            gridItems.push(
                new GridItem(idNumber, x, y, gridItemSize, gridItemSize)
            );
            x += gridItemSize;
            idNumber++;
        }
        x = 0;
        y += gridItemSize;
    }

    //Graphing all the grid items
    for(let i=0; i<gridItems.length; i++) {
        let gItem = gridItems[i];

        let top    = getTopNeighbour(i);
        let right  = getRightNeighbour(i);
        let bottom = getBottomNeighbour(i);
        let left   = getLeftNeighbour(i);
        if( top != null ) {
            gItem.addNeighbour(top);
        }
        if( right != null ) {
            gItem.addNeighbour(right);
        }
        if( bottom != null ) {
            gItem.addNeighbour(bottom);
        }
        if( left != null ) {
            gItem.addNeighbour(left);
        }

        graph.addItem(gItem);
    }

    let startID = (cols/2)>>0;
    let endID = gridItems.length - ((cols/2)>>0);
    solvedPath = graph.doBreadthFirstSearch(startID, endID);
    sIdx = solvedPath.length-1;
    drawPuzzle();

    animateResult();
});

function getTopNeighbour(idx) {
    let index = idx - cols;
    if( gridItems[idx].hasTop() &&
        index >= 0 &&
        gridItems[index].hasBottom() ) {

        return gridItems[index];
    }

    return null;
}

function getRightNeighbour(idx) {
    let index = idx + 1;
    let rowMax = (((idx/cols)>>0)+1) * rows;
    if( gridItems[idx].hasRight() &&
        index < rowMax &&
        gridItems[index].hasLeft() ) {

        return gridItems[index];
    }

    return null;
}

function getBottomNeighbour(idx) {
    let index = idx + cols;
    if( gridItems[idx].hasBottom() &&
        index < gridItems.length-1 &&
        gridItems[index].hasTop() ) {

        return gridItems[index];
    }

    return null;
}

function getLeftNeighbour(idx) {
    let index = idx - 1;
    let rowMin = ((idx/cols)>>0)*rows;
    if( gridItems[idx].hasLeft() &&
        index >= rowMin &&
        gridItems[index].hasRight() ) {

        return gridItems[index];
    }

    return null;
}

function drawPuzzle() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.strokeStyle = "#CCCCCC";
    gridItems.forEach(gItem => {
        gItem.render(ctx);
    });
}

function animateResult() {
    solvedPath[sIdx].highlight = true;
    solvedPath[sIdx].render(ctx);

    sIdx--;
    if( sIdx < 0 ) {
        return;
    }
    requestAnimationFrame(animateResult);
}