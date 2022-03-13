//GLOBALS
var ctx;
var width, height;

var dataArray;
var analyser;

var hue = 0;
var hueAdd = 0.5;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    let startButton = document.getElementById("start");
    startButton.addEventListener("click", startVis);
});

function startVis() {
    // shape style
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'orange';

    // request frame
    let audioElement = document.getElementById("audioSource");

    // make sure AudioContext will work fine in different browsers
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();
    // copy audio source data to manipulate later
    let source = audioCtx.createMediaElementSource(audioElement);
    // create audio analyser
    analyser = audioCtx.createAnalyser();      
    // set audio analyser      
    analyser.fftSize = 256;
    let bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    // Bind our analyser to the media element source.
    source.connect(analyser);
    source.connect(audioCtx.destination);
    // extract data
    analyser.getByteTimeDomainData(dataArray);

    document.getElementById("start").disabled = true;

    audioVisualize();
}

//Line Graph Visualization
// function audioVisualize() {
//     analyser.getByteTimeDomainData(dataArray);

//     // clear the previous shape
//     ctx.fillRect(0, 0, width, height);
//     ctx.beginPath();
//     let sliceWidth = width * (1.0 / dataArray.length);
//     let x = 0;
//     let v = dataArray[0] / 128.0;
//     let y = v * height / 2;
//     ctx.moveTo(x, y);
//     for(let i = 1; i < dataArray.length; i++) {
//         v = dataArray[i] / 128.0;
//         y = v * height / 2;
//         ctx.lineTo(x, y);
//         x += sliceWidth;
//     }
//     ctx.lineTo(width, height / 2);
//     ctx.stroke();

//     requestAnimationFrame(audioVisualize);
// }

//Circle Visualization
// function audioVisualize() {
//     analyser.getByteTimeDomainData(dataArray);

//     // clear the previous shape
//     ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
//     ctx.beginPath();
//     ctx.rect(0, 0, width, height);
//     ctx.fill();

//     let r = 200;
//     let cX = width/2;
//     let cY = height/2;

//     let radianAdd = Constants.TWO_PI * (1.0 / dataArray.length);
//     let rad = 0;
//     ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
//     for(let i=0; i<dataArray.length; i++) {
//         // v = dataArray[i] / 128.0;
//         // v = v * r;
//         v = dataArray[i];

//         let x = v * Math.cos(rad) + cX;
//         let y = v * Math.sin(rad) + cY;

//         ctx.beginPath();
//         ctx.arc(x, y, 2, 0, Constants.TWO_PI, false);
//         ctx.fill();

//         rad += radianAdd;
//     }
//     hue += hueAdd;
//     if( hue > 360 ) {
//         hue = 0;
//     }

//     requestAnimationFrame(audioVisualize);
// }

//Line Visualization but line fading away into distance
//Didnt work
// function audioVisualize() {
//     analyser.getByteTimeDomainData(dataArray);

//     // clear the previous shape
//     ctx.beginPath();
//     ctx.rect(0, 0, width, height);
//     ctx.fill();

//     ctx.beginPath();
//     let sliceWidth = width * (1.0 / dataArray.length);
//     let x = 0;
//     let v = dataArray[0] / 128.0;
//     let y = v * height / 1.2;
//     ctx.moveTo(x, y);
//     for(let i = 1; i < dataArray.length; i++) {
//         v = dataArray[i] / 128;
//         y = v * height / 1.2;

//         ctx.lineTo(x, y);

//         x += sliceWidth;
//     }
//     ctx.lineTo(width, height / 1.2);
//     ctx.stroke();

//     requestAnimationFrame(audioVisualize);
// }

//Circle Spikes Visualization
function audioVisualize() {
    analyser.getByteTimeDomainData(dataArray);

    // clear the previous shape
    //ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let radius = 127;
    let cX = width/2;
    let cY = height/2;

    let radianAdd = Constants.TWO_PI * (1.0 / dataArray.length);
    let radian = 0;
    for(let i=0; i<dataArray.length; i++) {
        let x = radius * Math.cos(radian) + cX;
        let y = radius * Math.sin(radian) + cY;
        ctx.beginPath();
        ctx.moveTo(x, y);

        v = dataArray[i];
        if( v < radius ) {
            v = radius;
        }
        x = v * Math.cos(radian) + cX;
        y = v * Math.sin(radian) + cY;
        ctx.lineTo(x, y);
        ctx.stroke();

        radian += radianAdd;
    }

    requestAnimationFrame(audioVisualize);
}
