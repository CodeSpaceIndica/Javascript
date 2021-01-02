var width = 800;
var height = 800;

var vContext;

var lRoad, rRoad;

var numVehicles = 20;
var vehicles = new Array(numVehicles);

function drawSystem() {
    drawRoads();
    drawVehicles();
}

function drawVehicles() {
    for(var i=0; i<numVehicles; i++) {
        vehicles[i].render(vContext);
    }
}

function drawRoads() {
    lRoad.render(vContext);
    rRoad.render(vContext);
}

function animate() {
    for(var i=0; i<numVehicles; i++) {
        vehicles[i].update();
        checkVehicleBounds(i);
        //console.log( parseInt(vehicles[i].x) );
    }

    drawSystem();

    requestAnimationFrame(animate);
}

function checkVehicleBounds(idx) {
    if( vehicles[idx].direction == Constants.DIR_LEFT ) {
        if( vehicles[idx].x > width+50) {
            var sz = Constants.VEH_SML;
            var r = parseInt( randomBetween(1, 1000) );
            if( r >= 0 && r < 333 ) {
                sz = Constants.VEH_SML;
            }
            else if( r >= 333 && r < 666 ) {
                sz = Constants.VEH_MED;
            }
            else if( r >= 666 ) {
                sz = Constants.VEH_LRG;
            }
    
            var disc = randomBetween(Constants.MIN_DISC, Constants.MAX_DISC);
            var dir = Constants.DIR_LEFT;

            var sX = -50;
            var sY = randomBetween(0, (height/2)-10);
            var speed = randomBetween(Constants.MIN_SPEED, Constants.MAX_SPEED);
    
            var r = parseInt( randomBetween(75, 255) );
            var g = parseInt( randomBetween(75, 255) );
            var b = parseInt( randomBetween(75, 255) );
            var clr = "#" + toHex(r) + toHex(g) + toHex(b);
    
            vehicles[idx] = new Vehicle(sz, disc, dir, sX, sY, speed, clr);
        }
    }
    else if( vehicles[idx].direction == Constants.DIR_RIGHT ) {
        if( vehicles[idx].x < -50 ) {
            var sz = Constants.VEH_SML;
            var r = parseInt( randomBetween(1, 1000) );
            if( r >= 0 && r < 333 ) {
                sz = Constants.VEH_SML;
            }
            else if( r >= 333 && r < 666 ) {
                sz = Constants.VEH_MED;
            }
            else if( r >= 666 ) {
                sz = Constants.VEH_LRG;
            }
    
            var disc = randomBetween(Constants.MIN_DISC, Constants.MAX_DISC);
            var dir = Constants.DIR_RIGHT;

            var sX = width+50;
            var sY = randomBetween((height/2), height-10);
            var speed = randomBetween(Constants.MIN_SPEED, Constants.MAX_SPEED);
            speed *= -1;
    
            var r = parseInt( randomBetween(75, 255) );
            var g = parseInt( randomBetween(75, 255) );
            var b = parseInt( randomBetween(75, 255) );
            var clr = "#" + toHex(r) + toHex(g) + toHex(b);
    
            vehicles[idx] = new Vehicle(sz, disc, dir, sX, sY, speed, clr);
        }
    }
}

/**
 * Initialize the Canvas
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("vCanvas");
    vContext = canvasElement.getContext("2d");
    var screenWidth = document.body.clientWidth;
    canvasElement.width = Math.floor( (screenWidth * 95)/100 );

    width = canvasElement.width;
    height = canvasElement.height;

    lRoad = new Road(0, 0, width, (height/2)-3);
    rRoad = new Road(0, (height/2), width, (height/2));

    for(var i=0; i<numVehicles; i++) {
        var sz = Constants.VEH_SML;
        var r = parseInt( randomBetween(1, 1000) );
        if( r >= 0 && r < 333 ) {
            sz = Constants.VEH_SML;
        }
        else if( r >= 333 && r < 666 ) {
            sz = Constants.VEH_MED;
        }
        else if( r >= 666 ) {
            sz = Constants.VEH_LRG;
        }

        var disc = randomBetween(Constants.MIN_DISC, Constants.MAX_DISC);
        var dir = Constants.DIR_LEFT;
        if( i % 2 == 0 ) {
            dir = Constants.DIR_RIGHT;
        }

        var sX = randomBetween(0, width);
        var sY = randomBetween(0, (height/2)-10);
        var speed = randomBetween(Constants.MIN_SPEED, Constants.MAX_SPEED);
        if( dir == Constants.DIR_RIGHT ) {
            sY = randomBetween((height/2), height-10);
            speed *= -1;
        }

        var r = parseInt( randomBetween(75, 255) );
        var g = parseInt( randomBetween(75, 255) );
        var b = parseInt( randomBetween(75, 255) );
        var clr = "#" + toHex(r) + toHex(g) + toHex(b);

        vehicles[i] = new Vehicle(sz, disc, dir, sX, sY, speed, clr)
    }

    animate();
}
