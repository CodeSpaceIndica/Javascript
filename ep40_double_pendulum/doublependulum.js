//GLOBALS
var ctx;
var width, height;

var offScrCanvas, offScrContext;

var G = 1;
var damping = 1; //1 Means NO damping.

var dPendulum1, dPendulum2;

window.addEventListener("load", (event) => {
    let theCanvas = document.getElementById("aCanvas");
    resizeCanvas(theCanvas, false);
    width = theCanvas.width;
    height = theCanvas.height;

    ctx = theCanvas.getContext("2d");

    let originPoint = new Point(width/2, 100);

    offScrCanvas = document.createElement('canvas');
    offScrCanvas.width = width;
    offScrCanvas.height = height;
    offScrContext = offScrCanvas.getContext("2d");
    offScrContext.fillStyle = "#000000";
    offScrContext.fillRect(0, 0, width, height);

    dPendulum1 = new DoublePendulumSystem(originPoint, "#414111");
    dPendulum2 = dPendulum1.clone();
    dPendulum2.traceClr = "#114111";
    dPendulum2.pendulum1.angle = dPendulum2.pendulum1.angle - 0.01;

    animate();
});

function animate() {
    ctx.drawImage(offScrCanvas, 0, 0);

    dPendulum1.update();
    dPendulum1.render(ctx, offScrContext);

    dPendulum2.update();
    dPendulum2.render(ctx, offScrContext);

    requestAnimationFrame(animate);
}
