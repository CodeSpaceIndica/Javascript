const MAX_RATE = 4.2;

var width, height;

var ctx;

var translateX = 0;
var rate = 0.5;
var incrRate = 0;

var hue = 0;
var incrHue = 0;

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("lCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    incrRate = 4 / width;
    incrHue = 360 / width;

    ctx.font = "20px Mono";

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill()

    translateX = (rate * width) / MAX_RATE;
    ctx.translate(-translateX, 0);

    chaos();
}

function reset() {
    rate = 0.5;
    hue = 0;

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill()

    chaos();
}

function chaos() {
    ctx.clearRect(translateX, 0, 130, 25);
    ctx.fillText("R - " + rate.toFixed(3), translateX+10, 20);

    ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";

    let genCount = 0.4;
    for(let i=0; i<1000; i++) {
        genCount = rate * genCount * (1 - genCount);

        let x = (rate / MAX_RATE) * width;
        let y = height - (genCount * height);

        ctx.fillRect(x, y, 2, 2);
    }

    hue += incrHue;
    rate += incrRate;
    if( rate > MAX_RATE ) {
        console.log("Done");
        return;
    }

    setTimeout(chaos, 0);
}
