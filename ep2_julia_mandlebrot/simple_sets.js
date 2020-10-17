var canvasSize = 850;
var ctx;
var gridSize = 20;
var gridArr = new Array();
var gridCount = 0;

var selectedC = Infinity;

function drawGrid() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    var counter = 1;
    var x = 0;
    var y = 0;
    for(var i=0; i<gridCount; i++) {
        x = 0;
        for(var j=0; j<gridCount; j++) {
            ctx.fillStyle = "#E1E1E1";
            if( counter % selectedC == 0 ) {
                ctx.fillStyle = "#FFA500";
            }
            ctx.fillRect(x, y, gridSize-0.1, gridSize-0.1);
            x += gridSize;
            counter++;
        }
        y += gridSize;
    }

    if( selectedC != Infinity ) {
        var theDiv = document.getElementById("cVal");
        theDiv.innerHTML = "C: " + selectedC;
        //ctx.fillStyle = "#000000";
        //ctx.fillText("C :" + selectedC, canvasSize-70, canvasSize-15);
    }
}

function init() {
    var canvas = document.getElementById("simpleSetsCanvas");
    ctx = canvas.getContext("2d");

    canvasSize = canvas.width;

    ctx.font = "14px Monospace";

    ctx.fillStyle = "#DDDDDD"

    gridCount = canvasSize / gridSize;
    var counter = 1;
    for(var i=0; i<gridCount; i++) {
        gridArr[i] = new Array();
        for(var j=0; j<gridCount; j++) {
            gridArr[i][j] = counter;
            counter++;
        }
    }

    var theDiv = document.getElementById("cVal");
    theDiv.innerHTML = "C: 0";

    document.getElementById("simpleSetsCanvas").onclick = function(event) {
        var mouseX = event.offsetX;
        var mouseY = event.offsetY;

        var counter = 1;
        var x = 0;
        var y = 0;
        for(var i=0; i<gridCount; i++) {
            x = 0;
            for(var j=0; j<gridCount; j++) {
                if( mouseX >= x && mouseX <= x+gridSize && mouseY >= y && mouseY <= y+gridSize ) {
                    selectedC =  counter;
                    drawGrid();
                    return;
                }
                x += gridSize;
                counter++;
            }
            y += gridSize;
        }
    }

    drawGrid();
}
