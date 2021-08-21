//Constants
const NUM_ORBS = 6;
const ORB_CANVAS_SIZE = 200;

var width, height;

var ctx;

var metaOrbCanvas, metaOrbCtx;
var imageData, pixelData;

var oRad = [];
var oPos = [];
var oInc = [];

/**
 * Initialize animation.
 */
function init() {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    let xScale = width / ORB_CANVAS_SIZE;
    let yScale = height / ORB_CANVAS_SIZE;
    ctx.scale(xScale, yScale);

    metaOrbCanvas = document.createElement("canvas");
    metaOrbCanvas.width = ORB_CANVAS_SIZE;
    metaOrbCanvas.height = ORB_CANVAS_SIZE;
    metaOrbCtx = metaOrbCanvas.getContext("2d");
    imageData = metaOrbCtx.createImageData(ORB_CANVAS_SIZE, ORB_CANVAS_SIZE);
    pixelData = imageData.data;

    for(let i=0; i<NUM_ORBS; i++) {
        oRad.push( randomBetween(5, 10) );

        oPos.push( new Point(
            randomBetween(2, ORB_CANVAS_SIZE), randomBetween(2, ORB_CANVAS_SIZE)
        ));

        oInc.push( new Point(
            randomBetween(-1, 1), randomBetween(-1, 1)
        ));
    }

    metaBalls();
}

/**
 * Animation Loop function
 */
function metaBalls() {
    for(let x=0; x<ORB_CANVAS_SIZE; x++) {
        for(let y=0; y<ORB_CANVAS_SIZE; y++) {
            //Evaulate the distance and sum it up.
            let sum = 0;
            for(let i=0; i<NUM_ORBS; i++) {
                // sum += 255 * oRad[i] / Math.sqrt(
                //     (x-oPos[i].x)*(x-oPos[i].x) + (y-oPos[i].y)*(y-oPos[i].y)
                // );
                sum += oRad[i] / Math.sqrt(
                    (x-oPos[i].x)*(x-oPos[i].x) + (y-oPos[i].y)*(y-oPos[i].y)
                );
            }

            let rgb = HSLtoRGB(sum, 1, 0.5);
            let px = (x + y * ORB_CANVAS_SIZE) * 4;
            pixelData[px+0] = rgb[0];
            pixelData[px+1] = rgb[1];
            pixelData[px+2] = rgb[2];
            // pixelData[px+0] = sum;
            // pixelData[px+1] = sum;
            // pixelData[px+2] = sum;
            pixelData[px+3] = 255;
        }
    }
    metaOrbCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(metaOrbCanvas, 0, 0);

    for(let i=0; i<NUM_ORBS; i++) {
        oPos[i].x += oInc[i].x;
        if( oPos[i].x < 0 || oPos[i].x > ORB_CANVAS_SIZE ) {
            oInc[i].x *= -1;
        }
        oPos[i].y += oInc[i].y;
        if( oPos[i].y < 0 || oPos[i].y > ORB_CANVAS_SIZE ) {
            oInc[i].y *= -1;
        }
    }


    requestAnimationFrame(metaBalls);
}
