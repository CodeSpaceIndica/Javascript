
function addEvents(canvasElement) {
    canvasElement.addEventListener("click", function(event) {
        if( isGameOver ) {
            initGame();
            return;
        }
        let mousePos = getRealMousePosition(event, canvasElement);

        let x = 0;
        let y = 0;
        for(let i=0; i<COUNT; i++) {
            for(let j=0; j<COUNT; j++) {
                if( mousePos.x > x && mousePos.x < x+colSize 
                    && mousePos.y > y && mousePos.y < y+rowSize ) {
                    
                    //If current position is a positive number, do nothing
                    if( drenchArr[i][j] > 0 ) {
                        return;
                    }

                    //If current position is a negative number, check to see
                    //if a positive number is nearby (NO Diagonals). If not, return.
                    let top = 0, right = 0, bottom = 0, left = 0;
                    if( i >= 1 ) {
                        top = drenchArr[i-1][j];
                    }
                    if( j <= drenchArr[i].length-2 ) {
                        right = drenchArr[i][j+1];
                    }
                    if( i <= drenchArr.length-2 ) {
                        bottom = drenchArr[i+1][j];
                    }
                    if( j >= 1 ) {
                        left = drenchArr[i][j-1];
                    }
                    if( top <= 0 && right <= 0 && bottom <= 0 && left <= 0 ) {
                        return;
                    }

                    //Convert all positive integers in array to 
                    //abs value of currently clicked item.
                    for(let ii=0; ii<COUNT; ii++) {
                        for(let jj=0; jj<COUNT; jj++) {
                            if( drenchArr[ii][jj] > 0 ) {
                                drenchArr[ii][jj] = drenchArr[i][j] * -1;
                            }
                        }
                    }
                    drenchArr[i][j] *= -1;
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
                    clickCount--;

                    drawDrenchBoard();

                    return;
                }
                x += colSize;
            }
            x = 0;
            y += rowSize;
        }
    });
}