//GLOBAL VARIABLES
var ctx;
//To store the width and the height of the Canvas
var width, height;

//An array to hold all the ants of the system
var ants = [];

var nest;

var stepPheromones = [];

function init() {
    let theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

    theCanvas.addEventListener("mousedown", function(event) {
        var mousePos = getRealMousePosition(event, this);
        //ants[0].setSearchPoint(mousePos);
        ants.forEach(ant => {
            ant.setSearchPoint(mousePos);
        });
    });

    width = theCanvas.width;
    height = theCanvas.height;

    nest = new Nest();

    for(let i=0; i<ANT_COUNT; i++) {
        let anAnt = new Ant();
        ants.push(anAnt);    
    }

    antSystem();
}

function antSystem() {
    //ctx.fillStyle = "#000000";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    stepPheromones.forEach(stp => {
        stp.step();
        stp.render(ctx);
    });

    ants.forEach(ant => {
        ant.step();
        ant.render(ctx);
    });

    nest.render(ctx);

    requestAnimationFrame(antSystem);
}
