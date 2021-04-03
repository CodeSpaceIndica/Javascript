var width, height;

var ctx;

var PARTICLE_INTERACTION = [];
// PARTICLE_INTERACTION[TYPES.RED] = {
//     1: { TYPE: TYPES.RED, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 20 },
//     2: { TYPE: TYPES.GREEN, INTERACTION: INTERACTION.REPEL, DISTANCE: 30 },
//     3: { TYPE: TYPES.BLUE, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 20 }
// }
// PARTICLE_INTERACTION[TYPES.GREEN] = {
//     1: { TYPE: TYPES.RED, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 20 },
//     2: { TYPE: TYPES.GREEN, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 20 },
//     3: { TYPE: TYPES.BLUE, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 30 }
// }
// PARTICLE_INTERACTION[TYPES.BLUE] = {
//     1: { TYPE: TYPES.RED, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 20 },
//     2: { TYPE: TYPES.GREEN, INTERACTION: INTERACTION.REPEL, DISTANCE: 20 },
//     3: { TYPE: TYPES.BLUE, INTERACTION: INTERACTION.ATTRACT, DISTANCE: 30 }
// }

var particles = new Array(MAX_PARTICLES);

let reqAnimID;

function init() {
    //Init the canvas
    var canvasElement = document.getElementById("gol2Canvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    //Make the particle sizes and the minimum and maximum interation distance 
    //a proportion of the width of the canvas.
    MIN_INTERACT_DIST = width / 100;
    MAX_INTERACT_DIST = MIN_INTERACT_DIST * 3;
    PARTICLE_SIZE = width / 222.22;
    PARTICLE_DIAM = PARTICLE_SIZE * 2;

    startAnim();
}

function reset() {
    cancelAnimationFrame(reqAnimID); 

    PARTICLE_INTERACTION = [];

    particles = new Array(MAX_PARTICLES);

    startAnim();
}

function startAnim() {

    for(let i=1; i<=5; i++) {
        let interactionList = [];
        for(let j=1; j<=5; j++) {
            let type = j;

            let randomNum = parseInt( randomBetween(0, 100) );
            let interactionType = INTERACTION.ATTRACT;
            if( randomNum % 5 == 0 ) {
                interactionType = INTERACTION.REPEL;
            }

            randomNum = parseInt( randomBetween(1, 4) );
            randomNum = randomNum > 3 ? 3 : randomNum;
            let distance = randomNum * MIN_INTERACT_DIST;

            let vv = {
                TYPE: type,
                INTERACTION: interactionType,
                DISTANCE: distance
            }
            interactionList[j] = vv;
        }
        PARTICLE_INTERACTION[i] = interactionList;
    }

    for(let i=0; i<particles.length; i++) {
        particles[i] = new Particle();
    }

    animLoop();
}

function animLoop() {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    for(let i=0; i<particles.length; i++) {
        particles[i].update();

        particles[i].render(ctx);
    }

    requestAnimationFrame(animLoop);
    //setTimeout(animLoop, 100);
}
