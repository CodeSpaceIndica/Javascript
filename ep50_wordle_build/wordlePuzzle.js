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

    //Check cell by cell
    for(let i=0; i<wordArr[currRow].length; i++) {
        let puzzleLetter = puzzleWord.charAt(i);
        let typedLetter  = wordArr[currRow][i];

        let cellDiv = document.getElementById("cell_" + currRow + "_" + i);
        let keybDiv = document.getElementById("char_" + typedLetter);

        //First check if the word appears in the same position
        if( puzzleLetter == typedLetter ) {
            cellDiv.className = "cell";
            cellDiv.classList.add("rightplace");

            keybDiv.className = "keychar";
            keybDiv.classList.add("rightplace");
        }
        //Second check if the letter appears ANYWHERE in the puzzle word
        else if( puzzleWord.indexOf(typedLetter) != -1 ) {
            cellDiv.classList.add("rightletter");
            keybDiv.classList.add("rightletter");
        }
        //Third check if the letter doesn't appear ANYWHERE in the puzzle word
        else if( puzzleWord.indexOf(typedLetter) == -1 ) {
            cellDiv.classList.add("notpresent");
            keybDiv.classList.add("notpresent");
        }
    }

    //Check if the typed word is the answer
    if( typedWord == puzzleWord ) {
        //Game over, you have won
        isWon = true;
        setMessage("You WON!!!", 2);
    }

    //Lost Logic
    if( currRow == rows-1 && !isWon ) {
        isLost = true;
        setMessage("You Lost. :-( . Puzzle word was :" + puzzleWord, 3);
    }

    renderPuzzle();

    currRow++;
    currCol = 0;
}