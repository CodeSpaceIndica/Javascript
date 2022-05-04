//CONSTANTS
const MAX_RADIUS = 15;
const DEPTH = 400;

var width, height;
var xCenter, yCenter;

var aCtx;

var points;

var drag = false;
var dragStartX, dragStartY;
var mX, mY;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    var canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    aCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;
    xCenter = width/2;
    yCenter = height/2;

    aCtx.translate(xCenter, yCenter);

    canvasElement.addEventListener("mousedown", function(event) {
        mouseLoc = getRealMousePosition(event, canvasElement);
        dragStartX = mouseLoc.x;
        dragStartY = mouseLoc.y;
        mX = mouseLoc.x;
        mY = mouseLoc.y;

        drag = true;
    });

    canvasElement.addEventListener("mousemove", function(event) {
        if( drag ) {
            mouseLoc = getRealMousePosition(event, canvasElement);
            mX = mouseLoc.x;
            mY = mouseLoc.y;

            let xSpeed = mX - dragStartX;
            let ySpeed = mY - dragStartY;

            dragStartX = mX;
            dragStartY = mY;

            xSpeed /= 100;
            ySpeed /= 100;

            points.forEach(point3d => {
                point3d.rotateX(xSpeed);
                point3d.rotateY(ySpeed);
            });

            projection();
        }
    });

    canvasElement.addEventListener("mouseup", function(event) {
        drag = false;
    });

    document.getElementById("molecule").addEventListener("change", setMolecule);

    setMolecule();
});

function setMolecule() {
    points = [];
    let moleculeName = document.getElementById("molecule").value;
    if( moleculeName == "water" ) {
        points = parseMolecule(water);
    }
    else if( moleculeName == "ethane" ) {
        points = parseMolecule(ethane);
    }
    else if( moleculeName == "cyclohexane" ) {
        points = parseMolecule(cyclohexane);
    }
    else if( moleculeName == "bmf" ) {
        points = parseMolecule(buckminsterfullerine);
    }
    else if( moleculeName == "benzene" ) {
        points = parseMolecule(benzene);
    }
    else if( moleculeName == "pyridine" ) {
        points = parseMolecule(pyridine);
    }
    else if( moleculeName == "methane" ) {
        points = parseMolecule(methane);
    }
    else if( moleculeName == "sulphuricacid" ) {
        points = parseMolecule(sulphuricacid);
    }
    else if( moleculeName == "glucose" ) {
        points = parseMolecule(glucose);
    }
    projection();
}

function projection() {
    aCtx.fillStyle = "#000000";
    aCtx.rect(-xCenter, -yCenter, width, height);
    aCtx.fill();

    points.sort((point1, point2) => {
        return point1.projected - point2.projected;
    });

    points.forEach(point3d => {
        point3d.draw(aCtx);
    });
}