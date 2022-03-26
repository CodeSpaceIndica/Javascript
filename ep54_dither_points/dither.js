//CONSTANTS
const PARTICLE_SIZE = 2;
const THRESHOLD = 125;
const SNAP_DISTANCE_SQRD = 5;

//GLOBALS
var ctx;
var width, height;

var anImage;

var points = new Array();
var pointsAnchor = new Array();

var mouseX, mouseY;

var deflectionDistance = 100;
var deflectionDistanceSqrd = deflectionDistance * deflectionDistance;

var dataArray;
var analyser;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    aCanvas.addEventListener("mousemove", function(event) {
        let mLoc = getRealMousePosition(event, aCanvas);
        mouseX = mLoc.x;
        mouseY = mLoc.y;
    });

    let startButton = document.getElementById("start");
    startButton.addEventListener("click", startVis);

    loadImage();
});

function loadImage() {
    anImage = new Image();
    anImage.src = "note_s.png";
    anImage.onload = function() {
        let imgW = this.width;
        let imgH = this.height;
        let factor = width / imgW;

        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = imgW;
        tempCanvas.height = imgH;
        let tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(anImage, 0, 0);
        let imageData = tempCtx.getImageData(0, 0, imgW, imgH);
        let pixelData = imageData.data;

        for(let i=0; i<imgW; i++) {
            for(let j=0; j<imgH; j++) {
                let currPix = (i + j * imgW) * 4;

                let r = pixelData[currPix+0];
                //let r = 0;

                //let g = pixelData[currPix+1];
                let g = 0;

                //let b = pixelData[currPix+2];
                let b = 0;

                let max = Math.max(r, g, b);

                if( max > THRESHOLD ) {
                    let x = i * factor;
                    let y = j * factor;

                    let rndX = randomBetween(-1, 1);
                    let rndY = randomBetween(-1, 1);

                    let aPoint = new Point(x+rndX, y+rndY);
                    points.push( aPoint );
                    pointsAnchor.push( aPoint.clone() );
                }
            }
        }

        tempCtx.putImageData(imageData, 0, 0);
    }        
}

function startVis() {
    // request frame
    let audioElement = document.getElementById("audioSource");

    // make sure AudioContext will work fine in different browsers
    let audioCtx = new AudioContext();

    // copy audio source data to manipulate later
    let source = audioCtx.createMediaElementSource(audioElement);

    // create audio analyser
    analyser = audioCtx.createAnalyser();      

    // set audio analyser
    analyser.fftSize = 512;
    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Bind our analyser to the media element source.
    source.connect(analyser);
    source.connect(audioCtx.destination);

    document.getElementById("start").disabled = true;

    dither();
}

function dither() {
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    for(let i=0; i<dataArray.length; i++) {
        let freq = (dataArray[i] - 128) / 2;
        let rIndex = parseInt( randomBetween(0, points.length-1) );
        let aPnt = points[rIndex];
        aPnt.x += randomBetween(-freq, freq);
        aPnt.y += randomBetween(-freq, freq);
    }

    ctx.fillStyle = "#FFFFFF";
    for(let i=0; i<points.length; i++) {
        let aPnt = points[i];

        let dist = getDistanceNoSqrt(aPnt.x, aPnt.y, mouseX, mouseY);
        if( dist < deflectionDistanceSqrd ) {
            //Remember angle is in radians
            let angle = getAngle(mouseX, mouseY, aPnt.x, aPnt.y);
            angle -= Math.PI;
            aPnt.x = Math.cos(angle)*deflectionDistance + mouseX;
            aPnt.y = Math.sin(angle)*deflectionDistance + mouseY;
        }

        if( !aPnt.equals(pointsAnchor[i]) ) {
            let dst = getDistanceNoSqrt(aPnt.x, aPnt.y, 
                pointsAnchor[i].x, pointsAnchor[i].y);
            let speed = dst / 20;
            let norm = speed / dst;
            let dX = (pointsAnchor[i].x - aPnt.x) * norm;
            let dY = (pointsAnchor[i].y - aPnt.y) * norm;
            aPnt.x += dX;
            aPnt.y += dY;
            if( dst < SNAP_DISTANCE_SQRD ) {
                aPnt.x = pointsAnchor[i].x;
                aPnt.y = pointsAnchor[i].y;
            }
        }

        ctx.beginPath();
        ctx.rect(aPnt.x, aPnt.y, PARTICLE_SIZE, PARTICLE_SIZE);
        ctx.fill();
    }

    requestAnimationFrame(dither);
}
