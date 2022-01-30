//GLOBALS
var ctx;
var width, height;

var circles = new Array();

var imageData, pixelData, origPixelData;

var availablePositions = new Array();

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

    ctx.fillStyle = "#FFFFFF";

    init();
});

async function init() {
    await loadImage();
}

function loadImage() {
    // wanted to keep the init function a bit more clean
    return new Promise((resolve, reject) => {
        const imageObject = new Image();

        imageObject.onload = () => resolve(loadPixels(imageObject));
        //imageObject.src = "codespace.png";
        imageObject.src = "thebigint.png";
    });
}

function loadPixels(imageObject) {
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    let tempCtx = tempCanvas.getContext("2d");
    tempCtx.drawImage(imageObject, 0, 0);
    imageData = tempCtx.getImageData(0, 0, width, height);
    pixelData = imageData.data;

    for(let i=0; i<width; i++) {
        for(let j=0; j<height; j++) {
            let currPix = (i + j * width) * 4;
            if( pixelData[currPix+0] == 255 ) {
                availablePositions.push( new Point(i, j) );
            }
        }
    }

    addCircles();

    circlePacking();
}

function addCircles() {
    for(let i=0; i<5; i++) {
        let circ = new Circle();
        circles.push( circ );
    }

    setTimeout(addCircles, 10);
}

function circlePacking() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    //ctx.fillStyle = "#f9d342";
    ctx.fillStyle = "#A0B6F7";

    for(let i=0; i<circles.length; i++) {
        circ = circles[i];
        circ.grow();
        if( circ.isGrowing && ( !circ.isWithinEdges() || circ.collideWithOtherCircles() || circ.isTooBig() ) ) {
            circ.isGrowing = false;
        }
        circ.draw(ctx);
    }

    requestAnimationFrame(circlePacking);
}
