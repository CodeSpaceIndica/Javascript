//CONSTANTS
var GAP = 3;

//GLOBALS
var ctx;
var width, height;

var numPoints = 25;
var voronoiPoints = new Array();

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    ctx.lineWidth = 0.5;

    for(let i=0; i<numPoints; i++) {
        voronoiPoints.push( 
            new VoronoiPoint( 
                new Point(randomBetween(5, width-5),
                randomBetween(5, height-5))
            )
        );
    }

    theCanvas.addEventListener("click", function(evt) {
        let mouseLoc = getRealMousePosition(evt, this);
        let newPoint = new Point(mouseLoc.x, mouseLoc.y);
        voronoiPoints.push( new VoronoiPoint(newPoint) );
        tesselate();
    });

    tesselate();
});

function tesselate() {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    for(let x=0; x<width; x+=GAP) {
        for(let y=0; y<height; y+=GAP) {
            let closestVPoint = getClosestVoronoiPoint(x, y);

            ctx.fillStyle = closestVPoint.clr;
            ctx.beginPath();
            ctx.arc(x, y, GAP, 0, Constants.TWO_PI, true);
            ctx.fill();
        }
    }

    ctx.fillStyle = "#000000";
    voronoiPoints.forEach(vPnt => {
        ctx.beginPath();
        ctx.arc(vPnt.point.x, vPnt.point.y, 3, 0, Constants.TWO_PI, true);
        ctx.fill();
    });
}

function getClosestVoronoiPoint(x, y) {
    let closest = undefined;
    let closestDistance = Number.MAX_SAFE_INTEGER;

    voronoiPoints.forEach(vPnt => {
        var dist = getDistanceNoSqrt(x, y, vPnt.point.x, vPnt.point.y);
        if( dist < closestDistance ) {
            closest = vPnt;
            closestDistance = dist;
        }
    });

    return closest;
}