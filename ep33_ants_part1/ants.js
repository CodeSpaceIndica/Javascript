//GLOBAL VARIABLES
var ctx;
//To store the width and the height of the Canvas
var width, height;

//An array to hold all the ants of the system
var ants = [];

var nest;

var foods = [];

var stepPheromones = [];
var foodPheromones = [];

var fps, lastTime;

function init() {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);

    ctx = theCanvas.getContext("2d");

    theCanvas.addEventListener("mousedown", function(event) {
        var mousePos = getRealMousePosition(event, this);
        ants[0].setSearchPoint(mousePos);
    });

    fps = 0;
    width = theCanvas.width;
    height = theCanvas.height;

    nest = new Nest();

    for(let i=0; i<ANT_COUNT; i++) {
        let anAnt = new Ant();
        ants.push(anAnt);
    }

    for(let i=0; i<1; i++) {
        let oneFood = new Food();
        foods.push( oneFood );
    }

    antSystem();
}

function antSystem() {
    ctx.fillStyle = "#000000";
    //ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    stepPheromones.forEach(stp => {
        stp.step();
        stp.render(ctx);
    });
    foodPheromones.forEach(fdp => {
        fdp.step();
        fdp.render(ctx);
    });

    foods.forEach(fd => {
        fd.step();
        fd.render(ctx);
    });

    ants.forEach(ant => {
        ant.step();
        ant.render(ctx);
    });

    nest.render(ctx);

    if( !lastTime ) {
        lastTime = performance.now();
    }
    let delta = (performance.now() - lastTime)/1000;
    lastTime = performance.now();
    let calcFps = 1/delta;
    if( lastTime % 20 == 0 ) {
        fps = calcFps;
    }
    ctx.beginPath();
    ctx.fillText(fps.toFixed(0), 10, 10);
    //ctx.fillText(lastTime, 10, 10);
    ctx.fill();

    requestAnimationFrame(antSystem);
}
