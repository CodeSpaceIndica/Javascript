const GRAVITY = new Point(0, 0.8);

var grvCtx;
var width, height;

var orb;

function init() {
    var grvCanvas = document.getElementById("physCanvas");
    grvCtx = grvCanvas.getContext("2d");

    width = grvCanvas.width;
    height = grvCanvas.height;

    orb = new Orb(25, 20);
    orb.addForce(new Point(2.5, 0));

    animate();
}

function animate() {
    grvCtx.clearRect(0, 0, width, height);

    orb.addForce(GRAVITY);
    orb.update();
    orb.render(grvCtx);

    requestAnimationFrame(animate);
    //setTimeout(animate, 200);
}