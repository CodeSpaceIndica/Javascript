const GRAVITY = new Point(0, 0.8);
const GENE_LENGTH = 200;
const ORB_COUNT = 20;
const OBSTACLE_COUNT = 5;

var gaCtx;
var width, height;

var orbs = [];
var obstacles = [];

var target;

var idx = 0;

var generation = 1;

function init() {
    var gaCanvas = document.getElementById("gaCanvas");
    gaCtx = gaCanvas.getContext("2d");

    width = gaCanvas.width;
    height = gaCanvas.height;

    gaCtx.font = "15px Mono";

    for(var i=0; i<ORB_COUNT; i++) {
        var anOrb = new Orb();
        orbs.push(anOrb);
    }

    for(var i=0; i<OBSTACLE_COUNT; i++) {
        var anObstacle = new Obstacle();
        obstacles.push(anObstacle);
    }

    target = new Point(width-50, height-50);

    animate();
}

function animate() {
    gaCtx.clearRect(0, 0, width, height);

    for(var i=0; i<orbs.length; i++) {
        orbs[i].addForce(GRAVITY);
        orbs[i].update(idx);
        orbs[i].render(gaCtx);
    }

    for(var i=0; i<obstacles.length; i++) {
        obstacles[i].render(gaCtx);
    }

    gaCtx.fillStyle = "#00AA00";
    gaCtx.beginPath();
    gaCtx.fillRect(target.x, target.y, 10, 50);
    gaCtx.fill();

    gaCtx.fillStyle = "#000000";
    gaCtx.fillText("Gene       :" + idx, 5, 20);
    gaCtx.fillText("Generation :" + generation, 5, 37);

    idx++;

    if( idx > GENE_LENGTH-1 ) {
        generation++;
        idx = 0;

        //Calcualte fitness of each orb
        for(var i=0; i<orbs.length; i++) {
            orbs[i].calculateFitness();
        }

        //sort orbs by how close they have got to their target.
        orbs.sort(function(a, b) {
            return b.fitness - a.fitness;
        });

        //Take the top 20% of the winners
        var top20Count = orbs.length * 0.2;
        var winningOrbs = [];
        var sumOfFitnesses = 0;
        for(var i=0; i<top20Count; i++) {
            winningOrbs.push( orbs[i] );
            sumOfFitnesses += orbs[i].fitness;
        }

        //Prep next generation
        var DNAOfTheNextGeneration = [];
        for(var i=0; i<winningOrbs.length; i++) {
            var ftness = winningOrbs[i].fitness;
            var howManyTimesNextGen = parseInt( Math.ceil(ftness / sumOfFitnesses * ORB_COUNT) );
            for(var j=0; j<howManyTimesNextGen; j++) {
                DNAOfTheNextGeneration.push(winningOrbs[i].DNA);
            }
        }
        //Slice to nmber of orbs.
        DNAOfTheNextGeneration = DNAOfTheNextGeneration.slice(0, ORB_COUNT);
        orbs = [];
        for(var i=0; i<ORB_COUNT; i++) {
            var r1 = parseInt(randomBetween(0, ORB_COUNT));
            var randDNA1 = DNAOfTheNextGeneration[r1];
            var r2 = parseInt(randomBetween(0, ORB_COUNT));
            var randDNA2 = DNAOfTheNextGeneration[r2];

            var newDNA = mate(randDNA1, randDNA2);
            orbs.push( new Orb(newDNA) );
        }
    }

    //requestAnimationFrame(animate);
    setTimeout(animate, 25);
}

function mate(dna1, dna2) {
    var newMatedDNA = [];
    for(var i=0; i<dna1.length; i++) {
        if( i % 2 == 0 ) {
            newMatedDNA.push( dna1[i] );
        }
        else {
            newMatedDNA.push( dna2[i] );
        }

        //mutation
        var rChance = parseInt(randomBetween(100, 500));
        if( rChance % 121 == 0) {
            newMatedDNA[i] = new Point(
                randomBetween(-0.3, 0.3), //X force
                randomBetween(-0.7, 0), //Y force
            );
        }
    }

    return newMatedDNA;
}