
function addPuzzleBlocks() {
    let puzzleDiv = document.getElementById("puzzle");
    for(let i=0; i<rows; i++) {
        let puzzleRowDiv = addPuzzleRow(i, puzzleDiv);
        for(let j=0; j<cols; j++) {
            addPuzzleCell(i, j, puzzleRowDiv);
        }
    }
}

function addPuzzleRow(rowNum, puzzleDiv) {
    let puzzleRow = document.createElement("div");
    puzzleRow.id = "row_" + rowNum;

    puzzleDiv.appendChild(puzzleRow);

    return puzzleRow;
}

function addPuzzleCell(rowNum, colNum, puzzleRowDiv) {
    let puzzleCell = document.createElement("div");
    puzzleCell.id = "cell_" + rowNum + "_" + colNum; //cell_1_2
    puzzleCell.innerHTML = "&nbsp;";
    puzzleCell.className = "cell";

    puzzleRowDiv.appendChild(puzzleCell);
}

function addKeys() {
    let row1KeyboardDiv = document.getElementById("keyboardRow1");
    for(let i=0; i<row1Letters.length; i++) {
        addKeyboardCharacter(row1Letters[i], row1KeyboardDiv);
    }

    let row2KeyboardDiv = document.getElementById("keyboardRow2");
    for(let i=0; i<row2Letters.length; i++) {
        addKeyboardCharacter(row2Letters[i], row2KeyboardDiv);
    }

    let row3KeyboardDiv = document.getElementById("keyboardRow3");
    for(let i=0; i<row3Letters.length; i++) {
        addKeyboardCharacter(row3Letters[i], row3KeyboardDiv);
    }
}

function addKeyboardCharacter(keyChar, keyboardRow) {
    keyChar = keyChar.toUpperCase();
    let keycharDiv = document.createElement("div");
    keycharDiv.id = "char_" + keyChar;
    keycharDiv.className = "keychar";
    keycharDiv.setAttribute("data-charid", keyChar);
    keycharDiv.innerHTML = keyChar;

    keyboardRow.appendChild(keycharDiv);
}

function renderPuzzle() {
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            let puzzleCell = document.getElementById("cell_" + i + "_" + j);
            if( wordArr[i][j] !== undefined ) {
                puzzleCell.innerHTML = wordArr[i][j];
            }
            else {
                puzzleCell.innerHTML = "&nbsp;";
            }
        }
    }
}

function resetPuzzlePieces() {
    //Reset the keyboard first
    for(let i=0; i<row1Letters.length; i++) {
        let aChar = row1Letters[i].toUpperCase();
        let keyDiv = document.getElementById("char_" + aChar);
        keyDiv.className = "keychar";
    }

    for(let i=0; i<row2Letters.length; i++) {
        let aChar = row2Letters[i].toUpperCase();
        let keyDiv = document.getElementById("char_" + aChar);
        keyDiv.className = "keychar";
    }

    for(let i=0; i<row3Letters.length; i++) {
        let aChar = row3Letters[i].toUpperCase();
        let keyDiv = document.getElementById("char_" + aChar);
        keyDiv.className = "keychar";
    }

    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            let id = "cell_" + i + "_" + j;
            let cellDiv = document.getElementById(id);
            cellDiv.className = "cell";
        }
    }
}