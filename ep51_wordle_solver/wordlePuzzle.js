function initWordArr() {
    for(let i=0; i<rows; i++) {
        wordArr[i] = new Array();
    }
}

function addCharacter(aChar) {
    //If the number of rows has exceeded, don't do anything
    //Simply return
    if( currRow >= rows ) {
        return;
    }

    //If the number of columns has exceeded, don't do anything
    //Simply return
    if( currCol >= cols ) {
        return;
    }

    wordArr[currRow][currCol] = aChar;
    renderPuzzle();

    currCol++;
}

function eraseLastChar() {
    setMessage("&nbsp;", 3);

    //If there are no more columns to deduct, simply return
    if( currCol <= 0 ) {
        return;
    }

    currCol--;
    wordArr[currRow][currCol] = undefined;

    renderPuzzle();
}

function eraseCurrRow() {
    wordArr[currRow] = [];

    currCol = 0;
    setMessage("&nbsp;", 1);
    renderPuzzle();
}

function rowComplete() {
    //If the number of rows has exceeded, dont' do anything
    //Simply return
    if( currRow >= rows ) {
        return;
    }

    //If the word is not yet complete, don't do anything
    //Simply return
    if( wordArr[currRow].length < cols ) {
        return;
    }
    setMessage("&nbsp;", 1);

    //Get the typed word first
    let typedWord = wordArr[currRow].join("");
    //Check if it is a valid word first
    if( fiveLetterArray.indexOf(typedWord) == -1 ) {
        setMessage("Not a valid word.", 3);
        return;
    }

    let styleArr = new Array(null, null, null, null, null);

    //Actual Puzzle Word
    let actualPuzzleWord = atob(puzzleWord);

    //Create a clone by doing slice... slice will create a copy 
    //We are doing this because simply assigning will 
    //only copy refernces
    let puzzleWordClone = actualPuzzleWord.slice();
    //First check if the word appears in the same position
    //Check cell by cell
    for(let i=0; i<wordArr[currRow].length; i++) {
        let puzzleLetter = actualPuzzleWord.charAt(i);
        let typedLetter  = wordArr[currRow][i];

        if( puzzleLetter == typedLetter ) {
            styleArr[i] = "rightplace";

            puzzleWordClone = puzzleWordClone.replace(typedLetter, "");
        }
    }

    //Check cell by cell
    for(let i=0; i<wordArr[currRow].length; i++) {
        if( styleArr[i] != null ) {
            continue;
        }
        let typedLetter  = wordArr[currRow][i];

        //Second check if the letter appears ANYWHERE in the puzzleWord
        if( puzzleWordClone.indexOf(typedLetter) != -1 ) {
            styleArr[i] = "rightletter";
            puzzleWordClone = puzzleWordClone.replace(typedLetter, "");
        }
        //Third check if the letter doesn't appear ANYWHERE in the puzzle word
        else if( actualPuzzleWord.indexOf(typedLetter) == -1 ) {
            styleArr[i] = "notpresent";
        }
        else if( puzzleWordClone.indexOf(typedLetter) == -1 && 
        actualPuzzleWord.indexOf(typedLetter) != -1 ) {
            styleArr[i] = "notpresent";
        }
    }

    for(let i=0; i<styleArr.length; i++) {
        let typedLetter  = wordArr[currRow][i];
        let cellDiv = document.getElementById("cell_" + currRow + "_" + i);
        let keybDiv = document.getElementById("char_" + typedLetter);
        setTimeout( function() {
            if( styleArr[i] == "rightplace" ) {
                cellDiv.className = "cell";
                keybDiv.className = "keychar";
            }
            cellDiv.classList.add(styleArr[i]);
            keybDiv.classList.add(styleArr[i]);
        }, (i+1)*100);
    }

    //Check if the typed word is the answer
    if( typedWord == actualPuzzleWord ) {
        //Game over, you have won
        isWon = true;
        setMessage("You WON!", 2);
        document.getElementById("char_shrr").classList.remove("disabled");
        document.getElementById("char_rstt").classList.remove("disabled");
    }

    //Lost Logic
    if( currRow == rows-1 && !isWon ) {
        isLost = true;
        setMessage("You Lost. :-( . Puzzle word was :" + actualPuzzleWord, 3);
        document.getElementById("char_rstt").classList.remove("disabled");
    }

    renderPuzzle();

    currRow++;
    currCol = 0;
}