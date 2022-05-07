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

var moleculeName, moleculeFormula;

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    let canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    aCtx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;
    xCenter = width/2;
    yCenter = height/2;

    aCtx.font = "2em Monospace";
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

            let xSpeed = (mX - dragStartX) / 100;
            let ySpeed = (mY - dragStartY) / 100;

            rotateMolecule(xSpeed, ySpeed);

            dragStartX = mX;
            dragStartY = mY;
        }
    });

    canvasElement.addEventListener("mouseup", function(event) {
        drag = false;
    });

    canvasElement.addEventListener("touchstart", function(event) {
        let touches = event.changedTouches;
        let boundingRect = this.getBoundingClientRect();

        touchX = touches[0].clientX - boundingRect.left;
        touchY = touches[0].clientY - boundingRect.top;

        dragStartX = touchX;
        dragStartY = touchY;
        mX = touchX;
        mY = touchY;

        drag = true;

        event.preventDefault();
    });

    canvasElement.addEventListener("touchmove", function(event) {
        if( drag ) {
            let touches = event.changedTouches;
            let boundingRect = this.getBoundingClientRect();
    
            mX = touches[0].clientX - boundingRect.left;
            mY = touches[0].clientY - boundingRect.top;
    
            let xSpeed = (mX - dragStartX) / 100;
            let ySpeed = (mY - dragStartY) / 100;

            rotateMolecule(xSpeed, ySpeed);

            dragStartX = mX;
            dragStartY = mY;
        }

        event.preventDefault();
    });

    canvasElement.addEventListener("touchend", function(event) {
        drag = false;    
    });

    canvasElement.addEventListener("dblclick", function(event) {
        autoR = !autoR;
        if( autoR ) {
            autoRot();
        }
        event.preventDefault();
    });

    initializeDefinitions();
});

function rotateMolecule(xSpeed, ySpeed) {
    points.forEach(point3d => {
        point3d.rotateX(xSpeed);
        point3d.rotateY(ySpeed);
    });

    projection();
}

function initializeDefinitions() {
    let selectDiv = document.getElementById("selectDiv");

    let selectElem = document.createElement("select");
    selectElem.id = "moleculeSelect";

    definitions.molecules.forEach(molecule => {
        let id = molecule.id;
        let name = molecule.name;
        let optionElem = document.createElement("option");
        optionElem.value = id;
        optionElem.innerText = name;

        selectElem.appendChild(optionElem);
    });

    selectDiv.appendChild(selectElem);

    document.getElementById("moleculeSelect").addEventListener("change", setMolecule);

    setMolecule();
}

function setMolecule() {
    points = [];

    let moleculeID = document.getElementById("moleculeSelect").value;
    definitions.molecules.forEach(molecule => {
        let id = molecule.id;
        if( id == moleculeID ) {
            moleculeName = molecule.name;
            moleculeFormula = molecule.formula;
            let xyz = molecule.xyz;
            points = parseMolecule(xyz);
        }
    });

    projection();

    rotateMolecule(0.001, 0.001);
}

function projection() {
    aCtx.fillStyle = "#000000";
    aCtx.rect(-xCenter, -yCenter, width, height);
    aCtx.fill();

    aCtx.fillStyle = "#F1F1F1";
    aCtx.fillText(moleculeName, -xCenter+3, -yCenter+20);
    aCtx.fillText(moleculeFormula, -xCenter+3, -yCenter+45);

    points.sort((point1, point2) => {
        return point1.projected - point2.projected;
    });

    points.forEach(point3d => {
        point3d.draw(aCtx);
    });
}

var t = 0.001;
var autoR = false;
function autoRot() {
    if( !autoR ) {
        return;
    }
    rotateMolecule(Math.sin(t)/5, Math.cos(t)/5);

    t += 0.02;

    setTimeout(autoRot, 40);
}
