//GLOBALS
var ctx;
var width, height;

var cX, cY;
var radius;

//In Milliseconds
var timeDelay = 25;

//An array of angles having values from 0 to 2*Math.PI
var valuesArray = new Array();

var index = 0;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    ctx.lineWidth = 7;
    ctx.lineCap = "round";

    document.getElementById("start").addEventListener("click", startSort);
    document.getElementById("shuffle").addEventListener("click", doShuffle);

    cX = width / 2;
    cY = height / 2;
    radius = (width/2) - 50;

    initAudio();

    for(let h=0; h<360; h++) {
        valuesArray.push(h);
    }

    doShuffle();
});

function drawHueCircle() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let radian = 0;
    let radianAdd = (Math.PI*2) / valuesArray.length;
    for(let i=0; i<valuesArray.length; i++) {
        let x = radius * Math.cos(radian) + cX;
        let y = radius * Math.sin(radian) + cY;

        ctx.strokeStyle = "hsl(" + valuesArray[i] + ",100%,50%)";
        ctx.beginPath();
        ctx.moveTo(cX, cY);
        ctx.lineTo(x, y);
        ctx.stroke();

        radian += radianAdd;
    }
}

function shuffle(anArray) {
    let currentIndex = anArray.length;
    let randomIndex = 0;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        //Pick a remaining element...
        randomIndex = Math.floor( randomBetween(0, currentIndex) );
        currentIndex--;

        //Swap with the current element.
        let tmp = anArray[currentIndex];
        anArray[currentIndex] = anArray[randomIndex];
        anArray[randomIndex] = tmp;
    }

    return anArray;
}

function doShuffle() {
    valuesArray = shuffle(valuesArray);

    drawHueCircle();
}

function startSort() {
    index = 0;
    
    document.getElementById("start").disabled = true;
    document.getElementById("shuffle").disabled = true;
    
    doSort();
}

function doSort() {
    //BUBBLE SORT
    for (let j=0; j<valuesArray.length-index; j++) {
        if (valuesArray[j] > valuesArray[j+1]) {
            let tmp = valuesArray[j];
            valuesArray[j] = valuesArray[j+1];
            valuesArray[j+1] = tmp;
        }
    }
    index++;
    if( index > valuesArray.length-1 ) {
        document.getElementById("start").disabled = false;
        document.getElementById("shuffle").disabled = false;
        return;
    }


    //Play note only when a swap happens.
    let frequency = (valuesArray[index] * 10) + 500;
    playNote(frequency, 10);

    drawHueCircle();

    setTimeout(doSort, timeDelay);
}