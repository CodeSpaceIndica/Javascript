//CONSTANTS
var NUM_DROPS = 300;

//GLOBALS
var ctx;
var width, height;

var dropPoints = new Array();
var dropSpeeds = new Array();
var colors = new Array();

var lineW = 7;
var lightningPoints = new Array();

var thunderSoundsArr = new Array();
var sound = false;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    //resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    let thn = new Audio("thunder1.mp3");
    thunderSoundsArr.push(thn);
    thn = new Audio("thunder2.mp3");
    thunderSoundsArr.push(thn);
    thn = new Audio("thunder3.mp3");
    thunderSoundsArr.push(thn);
    thn = new Audio("thunder4.mp3");
    thunderSoundsArr.push(thn);

    for(let i=0; i<NUM_DROPS; i++) {
        let rPoint = new Point(
            randomBetween(5, width-5),
            randomBetween(5, height-5),
        );
        let rSpeed = randomBetween(1, 5);
        dropPoints.push(rPoint);
        dropSpeeds.push(rSpeed);
        let color = parseInt(rSpeed * 80);
        colors.push("rgb(" + color + "," + color + "," + color + ")");
    }

    let timeOut = parseInt( randomBetween(5000, 7000) );
    setTimeout(createLightning, timeOut);

    rain();
});

function rain() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.lineWidth = 1.0;
    for(let i=0; i<NUM_DROPS; i++) {
        let x = dropPoints[i].x;
        let y = dropPoints[i].y;
        let color = colors[i];
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y+dropSpeeds[i]);
        ctx.stroke();

        dropPoints[i].y += dropSpeeds[i];
        if( dropSpeeds[i] < 8 ) {
            dropSpeeds[i] += 0.05;
        }

        if( dropPoints[i].y > height ) {
            dropPoints[i].y = randomBetween(-50, -20);
            dropSpeeds[i] = randomBetween(1, 5);
            let clr = parseInt(dropSpeeds[i] * 80);
            colors[i] = "rgb(" + clr + "," + clr + "," + clr + ")";
        }
    };

    requestAnimationFrame(rain);
}

function createLightning() {
    let x = randomBetween(0, width);
    let y = 0;
    do {
        let aPoint = new Point(x, y);
        lightningPoints.push(aPoint);
        let r = randomBetween(-5, 5);
        x += r;
        y += randomBetween(3, 12);
    } while(y <= height);

    lineW = 7;

    ctx.fillStyle = "#D0D0FF";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    if( sound ) {
        let r = parseInt( randomBetween(0, thunderSoundsArr.length-1) );
        thunderSoundsArr[r].play();
    }


    lightning();
}

function lightning() {
    ctx.lineWidth = lineW;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(lightningPoints[0].x, lightningPoints[0].y);
    lightningPoints.forEach(pnt => {
        ctx.lineTo(pnt.x, pnt.y);
    });
    ctx.stroke();

    lineW -= 0.2;
    if( lineW <= 0 ) {
        lightningPoints = [];
        let timeOut = parseInt( randomBetween(5000, 7000) );
        setTimeout(createLightning, timeOut);
        return;
    }

    requestAnimationFrame(lightning);
}

function soundFN() {
    sound = !sound;
    if( sound ) {
        document.getElementById("sndBtn").innerHTML = "&#128263; - Currently Playing";
    }
    else {
        document.getElementById("sndBtn").innerHTML = "&#128266; - Currently Muted";
    }
}