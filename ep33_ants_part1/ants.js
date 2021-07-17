//Constants
const MAX_ANT_SPEED = 3;
const MAX_STEER_FORCE = 0.2;

//GLOBAL VARIABLES
var ctx;
//To store the width and the height of the Canvas
var width, height;

//An array to hold all the ants of the system
var ants = [];

function init() {
    let theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

    theCanvas.addEventListener("mousedown", function(event) {
        var mousePos = getRealMousePosition(event, this);
        ants[0].setSearchPoint(mousePos);
    })

    width = theCanvas.width;
    height = theCanvas.height;

    let anAnt = new Ant(0);
    ants.push(anAnt);

    antSystem();
}

function antSystem() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ants.forEach(ant => {
        ant.step();
        ant.render(ctx);
    });

    requestAnimationFrame(antSystem);
}
