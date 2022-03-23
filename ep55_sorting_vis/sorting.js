//GLOBALS
var ctx;
var width, height;

var cX, cY;
var radius;

//In Milliseconds
var timeDelay = 25;

//An array of angles having values from 0 to 2*Math.PI
var valuesArray = new Array();

var isMuted = false;

var sorter;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.font = "14px Monospace";

    document.getElementById("start").addEventListener("click", startSort);
    document.getElementById("shuffle").addEventListener("click", doShuffle);
    document.getElementById("mute").addEventListener("click", soundControl);
    document.getElementById("sorter").addEventListener("change", sorterChange);

    cX = width / 2;
    cY = height / 2;
    radius = (width/2) - 50;

    initAudio();

    for(let h=0; h<360; h++) {
        valuesArray.push(h);
    }

    sorterChange();

    doShuffle();

    drawHueCircle();
});

function drawHueCircle() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Name    " + sorter.name()     , 5, 20);
    ctx.fillText("Loops   " + sorter.loopCount  , 5, 36);
    ctx.fillText("Swaps   " + sorter.swapCount  , 5, 52);
    ctx.fillText("Elapsed " + sorter.timeElapsed, 5, 68);
    ctx.fillText("Delay   " + timeDelay         , 5, 84);

    let radian = 0;
    let radianAdd = Constants.TWO_PI / valuesArray.length;
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

    if( sorter.isDone ) {    
        document.getElementById("start").disabled = false;
        document.getElementById("shuffle").disabled = false;
        document.getElementById("sorter").disabled = false;
    }

    requestAnimationFrame(drawHueCircle);
}

function soundControl() {
    isMuted = !isMuted;
    if( isMuted ) {
        document.getElementById("mute").innerText = "Un-Mute";
    }
    else {
        document.getElementById("mute").innerText = "Mute";
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

function sorterChange() {
    let sorterName = document.getElementById("sorter").value;
    sorter = getSorter(sorterName);
}

function getSorter(sorterName) {
    if( sorterName == "bubble" ) {
        return new BubbleSort();
    }
    else if( sorterName == "quick" ) {
        return new QuickSort();
    }
    else if( sorterName == "count" ) {
        return new CountingSort();
    }
    else if( sorterName == "insertion" ) {
        return new InsertionSort();
    }
    else if( sorterName == "bucket" ) {
        return new BucketSort();
    }

    return undefined;
}

function doShuffle() {
    valuesArray = shuffle(valuesArray);
    sorter.initSort();
}

async function sleep(timeMSeconds) {
    return new Promise( resolve => setTimeout(resolve, timeMSeconds) );
}

function startSort() {
    document.getElementById("start").disabled = true;
    document.getElementById("shuffle").disabled = true;
    document.getElementById("sorter").disabled = true;

    sorter.initSort();
    sorter.doSort();
}
