//GLOBALS
var ctx;
var width, height;

var paths = new Array();

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    let screenWidth = document.body.clientWidth;
    if( screenWidth > width ) {
        width  = (screenWidth * 95)/100;
        theCanvas.width = width;
    }

    let pathA = new Path();
    pathA.addPoint( new Point(0, 125) );
    pathA.addPoint( new Point(width, 125) );

    let pathB = new Path();
    pathB.addPoint( new Point(width, 275) );
    pathB.addPoint( new Point(0, 275) );

    paths.push(pathA);
    paths.push(pathB);

    simulateTraffic();
});

function simulateTraffic() {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    for(let i=0; i<paths.length; i++) {
        paths[i].render(ctx);
    }

    requestAnimationFrame(simulateTraffic);
}
