//GLOBAL VARIABLES
var ctx;
//To store the width and the height of the Canvas
var width, height;

//An array to hold all the ants of the system
var ants = [];

function init() {
    let theCanvas = document.getElementById("aCanvas");
    ctx = theCanvas.getContext("2d");

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