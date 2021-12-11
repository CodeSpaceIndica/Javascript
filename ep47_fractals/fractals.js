//GLOBALS
var ctx;
var width, height;

//Adjustables
var angle = 0.8;
var angleOffset = 0;

var startLineSize = 150;
var lineSizeReduction = 0.66;
var lineStoppingSize = 2;

var startLineThickness = 20;
var lineThicknessReduction = 0.75;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.shadowColor = "#555555";
    ctx.shadowBlur = 7;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.strokeStyle = "#FF0000";

    addEvents();

    drawFractal();
});

function addEvents() {
    document.querySelectorAll("input").forEach(inputItem => {
        inputItem.addEventListener("input", function(event) {
            if( this.id == "angle" ) {
                angle = parseFloat(this.value);
            }
            else if( this.id == "angleOffset" ) {
                angleOffset = parseFloat(this.value);
            }
            else if( this.id == "startLineSize" ) {
                startLineSize = parseFloat(this.value);
            }
            else if( this.id == "lineSizeReduction" ) {
                lineSizeReduction = parseFloat(this.value);
            }
            else if( this.id == "lineStoppingSize" ) {
                lineStoppingSize = parseFloat(this.value);
            }
            else if( this.id == "startLineThickness" ) {
                startLineThickness = parseFloat(this.value);
            }
            else if( this.id == "lineThicknessReduction" ) {
                lineThicknessReduction = parseFloat(this.value);
            }

            drawFractal();
        });
    });
}

function drawFractal() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.lineWidth = startLineThickness;

    ctx.save();

    ctx.translate(width/2, height);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -startLineSize);
    ctx.stroke();

    ctx.translate(0, -startLineSize);

    branchOut(startLineSize, startLineThickness, 0);

    ctx.restore();
}

function branchOut(lineSize, thickness, hue) {
    //Each Branch will reduce line size by a given amount
    lineSize *= lineSizeReduction;
    thickness *= lineThicknessReduction;
    hue += 20;

    if( lineSize < lineStoppingSize ) {
        return;
    }

    ctx.lineWidth = thickness;
    ctx.strokeStyle = "hsl(" + hue + ",100%,50%)";

    ctx.save();
    ctx.rotate(angle+angleOffset);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -lineSize);
    ctx.stroke();
    ctx.translate(0, -lineSize);
    branchOut(lineSize, thickness, hue);
    ctx.restore();

    ctx.save();
    ctx.rotate(-angle+angleOffset);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -lineSize);
    ctx.stroke();
    ctx.translate(0, -lineSize);
    branchOut(lineSize, thickness, hue);
    ctx.restore();
}
