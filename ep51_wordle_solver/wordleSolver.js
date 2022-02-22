//Which row are we currently trying.
var currentRowToTry = 0;

//Total number of rows available
var totalRows = 6;

//a Copy of the five letter words array
var arrayOfWords;

/**
 * A function that can "play and solve" a wordle game
 * all by itself.
 */
function solve() {
    //Create a copy of the original fiveLetterArray
    //This is an ES6 clone. DOES NOT WORK FOR MULTIDIMENSIONAL ARRAYS
    arrayOfWords = [...fiveLetterArray];
    //Remove words with duplicate letters
    arrayOfWords = arrayOfWords.filter(aWord => !wordHasDuplicateLetters(aWord) );
    //Remove plurals
    arrayOfWords = arrayOfWords.filter(aWord => !wordIsPlural(aWord) );
    currentRowToTry = 0;

    //Call the next step.
    solveStep();
}

function solveStep() {
    //We have tried to guess 6 times. 
    //If not found out by now... you lost :-()
    if( currentRowToTry > totalRows-1 ) {
        return;
    }

    console.log("Words Remaining :" + arrayOfWords.length);

    //1. Pick a random word from the list of words
    let solutionWord = pickRandomSolution();
    console.log(solutionWord);

    //Auto fill into the puzzle cells
    for(let j=0; j<solutionWord.length; j++) {
        let aChar = solutionWord.charAt(j);
        setTimeout( function() {
            addCharacter( aChar );
            depressKey( aChar );
        }, 250*(j+1));
    }

    new Promise( (resolve1) => {
        new Promise( (resolve11) => {
            setTimeout( function() {
                rowComplete();

                resolve11();
            }, 1500);
        }).then( function() {
            setTimeout( resolve1, 500 );
        });
    }).then( function() {
        //2. From the arrayWords filter out letters that are gray.
        //That is filter out words where the letters don't even
        //appear anywhere in the word.
        filterOutGrays();

        //3. From the array arrayOfWords, keep only those words
        //that have the letters in yellow, that is words that have 
        //the letters preset somewhere in them.
        keepOnlyPresentLetters();

        //4. From the array arrayOfWords, keep only thoe words
        //that have the letters in green in those exact places.
        keepOnlyExactPlaceLetters();

        //5. filter out guessed words
        filterOutGuessed(solutionWord);

        currentRowToTry++;

        //Finally check if the game is won
        //If not call the solve step again.
        if( !isWon ) {
            setTimeout(solveStep, 1500);
        }
    });
}

/**
 * Starts with a random solution.
 * @returns 
 */
function pickRandomSolution() {
    let randomIndex = parseInt(randomBetween(0, arrayOfWords.length-1) );
    let solutionWord = arrayOfWords[ randomIndex ];
    return solutionWord;
}

/**
 * Filter out words from arrayOfWords where
 * there are letters that are in Gray
 */
function filterOutGrays() {
    for(let col=0; col<cols; col++) {
        let puzzleCell = document.getElementById("cell_" + currentRowToTry + "_" + col);
        //If the puzzle cell has the "notpresent" style,
        //then we know its gray and thus have to filter out
        //those words that don't have the letter
        if( puzzleCell.classList.contains("notpresent") ) {
            let filterChar = puzzleCell.innerHTML;
            arrayOfWords = arrayOfWords.filter( aWord => !aWord.includes(filterChar) );
        }
    }
}

/**
 * From the array arrayOfWords, keep only those words
 * that have the letters in yellow
 */
function keepOnlyPresentLetters() {
    for(let col=0; col<cols; col++) {
        let puzzleCell = document.getElementById("cell_" + currentRowToTry + "_" + col);
        //If the puzzle cell has the "rightletter" style,
        //then we know its yellow and thus have to keep
        //those words that have the letter.
        if( puzzleCell.classList.contains("rightletter") ) {
            let filterChar = puzzleCell.innerHTML;
            filterChar = filterChar.charAt(0);
            arrayOfWords = arrayOfWords.filter( aWord => aWord.includes(filterChar) && aWord.charAt(col) !== filterChar );
        }
    }
}

/**
 * From the array arrayOfWords, keep only those words
 * that have the letters in green in those exact places
 */
function keepOnlyExactPlaceLetters() {
    for(let col=0; col<cols; col++) {
        let puzzleCell = document.getElementById("cell_" + currentRowToTry + "_" + col);
        //If the puzzle cell has the "rightplace" style,
        //then we know its green and thus have to keep
        //those words that have the letter in the right place
        if( puzzleCell.classList.contains("rightplace") ) {
            let filterChar = puzzleCell.innerHTML;
            filterChar = filterChar.charAt(0);
            arrayOfWords = arrayOfWords.filter( aWord => aWord.charAt(col) === filterChar );
        }
    }
}

/**
 * Filter out words from arrayOfWords that
 * are already guessed
 */
function filterOutGuessed(guessWord) {
    arrayOfWords = arrayOfWords.filter(aWord => aWord != guessWord );
}