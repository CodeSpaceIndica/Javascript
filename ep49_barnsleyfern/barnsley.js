//Constants
var MAX_POINTS = 10000;

//GLOBALS
var ctx;
var width, height;

var ctr = 0;
var x, y;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.fillStyle = "#00FF00";

    ctr = 0;
    x = 0;
    y = 0;

    plotBarnsleyFern();
    pointCounter();
});

function pointCounter() {
    let cCnt = ctr * 100;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, 100, 20);
    ctx.fill();
    
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.fillText(cCnt, 2, 15);
    ctx.fill();

    if( ctx > MAX_POINTS ) {
        return;
    }

    setTimeout(pointCounter, 250);
}

function plotBarnsleyFern() {
    for(let i=0; i<100; i++) {
        let nextX, nextY;
        let rnd = Math.random();
        if( rnd < 0.01 ) {
            nextX = 0;
            nextY = 0.16 * y;
        }
        else if( rnd < 0.86 ) {
            nextX =  0.85 * x + 0.04 * y;
            nextY = -0.04 * x + 0.85 * y + 1.6;
        }
        else if( rnd < 0.93 ) {
            nextX = 0.20 * x - 0.26 * y;
            nextY = 0.23 * x + 0.22 * y + 1.6;
        }
        else {
            nextX = -0.15 * x + 0.28 * y;
            nextY =  0.26 * x + 0.24 * y + 0.44;
        }

        //−2.1820 < x < 2.6558 and 0 ≤ y < 9.9983.
        let pX = map(x, -2.1820, 2.6558, 0, width);
        let pY = map(y, 0, 9.9983, height, 0);

        let h = map(y, 0, 9.9983, 0, 360);
        ctx.fillStyle = "hsl(" + h + ",100%, 50%)";
        ctx.beginPath();
        ctx.rect(pX, pY, 1, 1);
        ctx.fill();

        x = nextX;
        y = nextY;
    }

    ctr++;
    if( ctr > MAX_POINTS ) {
        console.log("Done");
        return;
    }

    setTimeout(plotBarnsleyFern, 1);
}
