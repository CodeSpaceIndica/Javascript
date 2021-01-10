var width, height;

var aStarCtx;

var blockSize = 20;
var blocks = [];

var startBlock, endBlock;

var neighbourOffsets = [ [-1,-1], [0,-1], [1,-1], 
                         [-1,0],          [1,0], 
                         [-1,1],  [0,1],  [1,1]];
//USE THE BELOW neighbourOffsets IF YOU WANT TO 
//DISREGARD DIAGNALS AS NEIGHBOURS.
// var neighbourOffsets = [ [0,-1], [-1,0], [1,0], [0,1]];

var isAnimating = false;
var res;
var animIdx = 0;

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("pathCanvas");
    canvasElement.addEventListener("mousedown", function(event) {
        if( isAnimating ) {
            return;
        }
        var mousePos = getRealMousePosition(event, this);
        //Set existing destination to false;
        endBlock.isDestination = false;

        //Get new end block at clicked position
        endBlock = getBlock(mousePos);
        endBlock.isDestination = true;

        doAStarSearch();
    });
    resizeCanvas(canvasElement, true);

    aStarCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    aStarCtx.lineWidth = "0.5";

    var x = 0;
    var y = 0;
    for(x=0; x<width; x+=blockSize) {
        var blockRow = [];
        for(y=0; y<height; y+=blockSize) {
            blockRow.push(new Block(x, y, false, false, false));
        }
        blocks.push(blockRow);
    }

    startBlock = blocks[0][0];
    endBlock = blocks[blocks.length-2][blocks[0].length-2];
    startBlock.isSource = true;
    endBlock.isDestination = true;

    //UNCOMMENT THESE LINES IF YOU WANT THE 
    //BLOCKED PATHS TO BE A STRAIGHT LINES
    // var halfJ = parseInt(blocks[0].length/2);
    // for(var i=0; i<blocks.length; i++) {
    //     blocks[i][halfJ].isBlocked = true;
    // }
    // blocks[10][halfJ].isBlocked = false;
    // blocks[20][halfJ].isBlocked = false;
    // blocks[25][halfJ].isBlocked = false;

    for(var i=0; i<400; i++) {
        var ii = parseInt( randomBetween(0, blocks.length-1) );
        var jj = parseInt( randomBetween(0, blocks[0].length-1) );
        if( !blocks[ii][jj].isDestination && !blocks[ii][jj].isSource ) {
            blocks[ii][jj].isBlocked = true;
        }
    }

    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks[i].length; j++) {
            blocks[i][j].render(aStarCtx);
        }
    }

    doAStarSearch();
}

function doAStarSearch() {
    //Remove path flags from all blocks.
    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks[i].length; j++) {
            blocks[i][j].isPath = false;
        }
    }

    //Do A-Star Search
    res = aStarSearch();
    res = res.reverse();

    animIdx = 0;
    isAnimating = true;
    animatePath();
}

function animatePath() {
    if( !res[animIdx] ) {
        isAnimating = false;
        return;
    }
    res[animIdx].isPath = true;

    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks[i].length; j++) {
            blocks[i][j].render(aStarCtx);
        }
    }

    animIdx++;
    if( animIdx > res.length-1 ) {
        isAnimating = false;
        return;
    }

    setTimeout(animatePath, 5);
}

/**
 * The primary A Start Search
 */
function aStarSearch() {
    var openList   = [];
    var closedList = [];
    openList.push(startBlock);

    while(openList.length > 0) {
        //The current block now becomes the 
        //block from the openList with the lowest 'f' 
        //value. 'f' is 'g' + 'h'.
        //'g' is distance between block to neighbour
        //'h' is heuristic distance between block to end block.
        var currentBlock = openList[0];
        for(var i=0; i<openList.length; i++) {
            if(openList[i].f < currentBlock.f) {
                currentBlock = openList[i];
            }
        }

        // End case -- result has been found, return the traced path
        if( currentBlock.sameAs(endBlock) ) {
            var curr = currentBlock;
            var finalPath = [];
            while(curr.parent) {
                finalPath.push(curr);
                curr = curr.parent;
            }
            return finalPath;
        }

        // Normal case -- move currentBlock from open to closed,
        // process each of its neighbors
        openList = removeFromList(openList, currentBlock);
        closedList.push(currentBlock);

        var neighbors = getNeighbours(currentBlock);
        for(var i=0; i<neighbors.length;i++) {
            var neighbor = neighbors[i];
            //If the block is a wall (or is a block)
            // or if the block has been visited
            //don't process it.
            if(listContainsBlock(closedList, neighbor) || neighbor.isBlocked) {
                continue;
            }

            //g-score is the shortest distance from start to 
            //current node, we need to check if
            //the path we have arrived at this neighbor is the 
            //shortest one we have seen yet
            // 1 is the distance from a node to it's neighbor
            var gScore = currentBlock.g + 1;
            var gScoreIsBest = false;

            if( !listContainsBlock(openList, neighbor) ) {
                //This the the first time we have arrived at this node, 
                //it must be the best
                //Also, we need to take the h (heuristic) score 
                //since we haven't done so yet

                gScoreIsBest = true;
                neighbor.h = getHeuristicDistance(neighbor, endBlock);
                openList.push(neighbor);
            }
            else if(gScore < neighbor.g) {
                //We have already seen the node, 
                //but last time it had a worse g (distance from start)
                gScoreIsBest = true;
            }

            if(gScoreIsBest) {
                // Found an optimal (so far) path to this node.
                // Store info on how we got here and
                // just how good it really is...
                neighbor.parent = currentBlock;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
    }

    // No result was found -- empty array signifies failure to find path
    return [];
}

function listContainsBlock(blockList, aBlock) {
    for(var i=0; i<blockList.length; i++) {
        if( aBlock.sameAs(blockList[i]) ) {
            return true;
        }
    }
    return false;
}

function removeFromList(blockList, aBlock) {
    var newList = [];
    for(var i=0; i<blockList.length; i++) {
        if( !aBlock.sameAs(blockList[i]) ) {
            newList.push(blockList[i]);
        }
    }
    return newList;
}

function getHeuristicDistance(block1, block2) {
    return getDistance(block1.x, block1.y, block2.x, block2.y);
}

function getNeighbours(aBlock) {
    var thisBlockI, thisBlockJ;
    var found = false;
    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks[i].length; j++) {
            if( aBlock.sameAs(blocks[i][j]) ) {
                thisBlockI = i;
                thisBlockJ = j;
                found = true;
                break;
            }
        }
        if( found ) {
            break;
        }
    }

    var neighbours = [];
    for(var i=0; i<neighbourOffsets.length; i++) {
        var ii = thisBlockI + neighbourOffsets[i][0];
        var jj = thisBlockJ + neighbourOffsets[i][1];

        if( ii >= 0 && ii < blocks.length-1 
            && jj >=0 && jj < blocks[0].length-1 ) {
            neighbours.push( blocks[ii][jj] );
        }
    }

    return neighbours;
}

function getBlock(mousePos) {
    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks[i].length; j++) {
            if( mousePos.x >= blocks[i][j].x 
                && mousePos.x <= blocks[i][j].x+blockSize 
                && mousePos.y >= blocks[i][j].y 
                && mousePos.y <= blocks[i][j].y+blockSize ) {
                    return blocks[i][j];
                }
        }
    }
    return;
}