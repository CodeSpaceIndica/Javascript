//GLOBALS
var ctx;
var width, height;

var dataArray;
var analyser;

var run = true;

var hue = 0;
var hueAdd = 1;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    var radioValue = document.querySelectorAll('input[name="vis"]').forEach(rad => {
        rad.addEventListener("click", function(event) {
            changeVis();
        });
    });

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

    audioVisualize_1();
}

function changeVis() {
    var radioValue = document.querySelector('input[name="vis"]:checked').value;

    run = false;

    if( radioValue == "vis1" ) {
        setTimeout(function() {
            analyser.fftSize = 512;
            let bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, width, height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'orange';
            run = true;
            audioVisualize_1();
        }, 200);
    }
    else if( radioValue == "vis2" ) {
        setTimeout(function() {
            analyser.fftSize = 256;
            let bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, width, height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'orange';
            run = true;
            audioVisualize_2();
        }, 200);
    }
    else if( radioValue == "vis3" ) {
        setTimeout(function() {
            analyser.fftSize = 256;
            let bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, width, height);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'orange';
            run = true;
            audioVisualize_3();
        }, 200);
    }
    else if( radioValue == "vis4" ) {
        setTimeout(function() {
            analyser.fftSize = 64;
            let bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        
            ctx.lineWidth = width / 32;
            run = true;
            audioVisualize_4();
        }, 200);
    }
}

//Line Graph Visualization
function audioVisualize_1() {
    if( !run ) {
        return;
    }
    analyser.getByteTimeDomainData(dataArray);

    // clear the previous shape
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    let sliceWidth = width * (1.0 / dataArray.length);
    let x = 0;
    let v = dataArray[0] / 128.0;
    let y = v * height / 2;
    ctx.moveTo(x, y);
    for(let i = 1; i < dataArray.length; i++) {
        v = dataArray[i] / 128.0;
        y = v * height / 2;
        ctx.lineTo(x, y);
        x += sliceWidth;
    }
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    requestAnimationFrame(audioVisualize_1);
}

//Circle Visualization
function audioVisualize_2() {
    if( !run ) {
        return;
    }
    analyser.getByteTimeDomainData(dataArray);

    // clear the previous shape
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let cX = width/2;
    let cY = height/2;

    let radianAdd = Constants.TWO_PI / dataArray.length;
    let radian = 0;
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    for(let i=0; i<dataArray.length; i++) {
        v = dataArray[i];

        let x = v * Math.cos(radian) + cX;
        let y = v * Math.sin(radian) + cY;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Constants.TWO_PI, false);
        ctx.fill();

        radian += radianAdd;
    }
    hue += hueAdd;
    if( hue > 360 ) {
        hue = 0;
    }

    requestAnimationFrame(audioVisualize_2);
}

//Circle Spikes Visualization
function audioVisualize_3() {
    if( !run ) {
        return;
    }
    analyser.getByteTimeDomainData(dataArray);

    // clear the previous shape
    //ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    let radius = 127;
    let cX = width/2;
    let cY = height/2;

    let radianAdd = Constants.TWO_PI / dataArray.length;
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

    requestAnimationFrame(audioVisualize_3);
}

//Bar Graph Visualization
function audioVisualize_4() {
    if( !run ) {
        return;
    }
    analyser.getByteTimeDomainData(dataArray);

    // clear the previous shape
    ctx.fillRect(0, 0, width, height);

    let sliceWidth = width / dataArray.length;
    let x = 0;
    let y = (height/2) - 63.5;
    
    let h = 0;
    let iH = 360 / dataArray.length;
    for(let i = 0; i < dataArray.length; i++) {
        v = (height/2) - (dataArray[i]/2);

        ctx.strokeStyle = "hsl(" + h + ",100%,75%)";
        ctx.beginPath();
        ctx.moveTo(x, y)
        ctx.lineTo(x, v);
        ctx.stroke();

        x += sliceWidth;
        h += iH;
    }

    requestAnimationFrame(audioVisualize_4);
}