var width, height;

var ctx;

var backCanvas, bCtx;

var pX, pY;

var hue = 0;

var currentAttractor;

var fontSize;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    backCanvas = document.createElement("canvas");
    backCanvas.width = width;
    backCanvas.height = height;
    bCtx = backCanvas.getContext("2d");

    bCtx.lineWidth = 2.0;
    bCtx.strokeStyle = "#ff0000";

    fontSize = parseInt(width / 60);
    ctx.font = fontSize + "px Monospace";
    ctx.fillStyle = "#ffffff";

    document.getElementById("attractor").addEventListener("change", changeAttractor);

    changeAttractor();

    attract();
});

function changeAttractor() {
    bCtx.fillStyle = "#000000";
    bCtx.beginPath();
    bCtx.rect(0, 0, width, height);
    bCtx.fill();

    pX = map(0, -30, 30, 0, width);
    pY = map(0, -30, 30, 0, height);

    let attractorName = document.getElementById("attractor").value;
    currentAttractor = getAttractor(attractorName);
}

function getAttractor(attractorName) {
    if( attractorName == "lorentz" ) {
        return new Lorentz();
    }
    else if( attractorName == "thomas" ) {
        return new Thomas();
    }
    else if( attractorName == "aizawa" ) {
        return new Aizawa();
    }
    else if( attractorName == "dadras" ) {
        return new Dadras();
    }
    else if( attractorName == "chen" ) {
        return new Chen();
    }
    else if( attractorName == "lorentz83" ) {
        return new Lorentz83();
    }
    else if( attractorName == "rossler" ) {
        return new Rossler();
    }
    else if( attractorName == "halvorsen" ) {
        return new Halvorsen();
    }
    else if( attractorName == "sprott" ) {
        return new Sprott();
    }
}

function attract() {
    currentAttractor.step();

    ctx.drawImage(backCanvas, 0, 0);

    bCtx.strokeStyle = "hsl(" + hue + ",100%,50%)";
    bCtx.beginPath();
    bCtx.moveTo(currentAttractor.xMap, currentAttractor.yMap);
    bCtx.lineTo(pX, pY);
    bCtx.stroke();

    ctx.beginPath();
    ctx.arc(currentAttractor.xMap, currentAttractor.yMap, 4, 0, Constants.TWO_PI, true);
    ctx.fill();

    let y = fontSize;
    ctx.fillText(currentAttractor.name(), 5, y);
    y += 5;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(5, y);
    ctx.lineTo(100, y);
    ctx.stroke();
    if( currentAttractor.a ) {
        y += fontSize;
        ctx.fillText("a = " + currentAttractor.a, 5, y);
    }
    if( currentAttractor.b ) {
        y += fontSize;
        ctx.fillText("b = " + currentAttractor.b, 5, y);
    }
    if( currentAttractor.c ) {
        y += fontSize;
        ctx.fillText("c = " + currentAttractor.c, 5, y);
    }
    if( currentAttractor.d ) {
        y += fontSize;
        ctx.fillText("d = " + currentAttractor.d, 5, y);
    }
    if( currentAttractor.e ) {
        y += fontSize;
        ctx.fillText("e = " + currentAttractor.e, 5, y);
    }
    if( currentAttractor.f ) {
        y += fontSize;
        ctx.fillText("f = " + currentAttractor.f, 5, y);
    }
    y += 5;
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(5, y);
    ctx.lineTo(100, y);
    ctx.stroke();
    if( currentAttractor.x0 ) {
        y += fontSize;
        ctx.fillText("x0 = " + currentAttractor.x0, 5, y);
    }
    if( currentAttractor.y0 ) {
        y += fontSize;
        ctx.fillText("y0 = " + currentAttractor.y0, 5, y);
    }
    if( currentAttractor.z0 ) {
        y += fontSize;
        ctx.fillText("z0 = " + currentAttractor.z0, 5, y);
    }

    pX = currentAttractor.xMap;
    pY = currentAttractor.yMap;

    hue++;

    requestAnimationFrame(attract);
}