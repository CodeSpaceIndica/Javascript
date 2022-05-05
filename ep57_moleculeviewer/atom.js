/**
 * A function that will parse a molecule text and create atoms out of it.
 * 
 * @param {*} moleculeInputStr 
 */
function parseMolecule(moleculeInputStr) {
    let threeDPoints = [];

    let lines = moleculeInputStr.split(/\r?\n/);
    lines.forEach(atomText => {
        atomText = atomText.trim();
        let atomicValues = atomText.split(" ");
        let elementType = atomicValues[0];
        let x = parseFloat(atomicValues[1]);
        let y = parseFloat(atomicValues[2]);
        let z = parseFloat(atomicValues[3]);

        let point3D = convertAtomTo3DPoint(elementType, x, y, z);
        threeDPoints.push(point3D);
    });

    return threeDPoints;
}

/**
 * The location values are converted to a value on the canvas 
 * so that it is accomodated fully.
 * 
 * @param {*} type - Element type of the atom. Allowed types are
 * o  - Oxygen
 * h  - Hydrogen
 * c  - Carbon
 * n  - Nitrogen
 * cl - Chlorine
 * na - Sodium
 * s - Sulphur
 * ph - Phosphorus
 * Ensure that this value is LOWER CASE.
 * 
 * @param {*} x - location on the X axis. A value between 0 and 1
 * @param {*} y - location on the Y axis. A value between 0 and 1
 * @param {*} z - location on the Z axis. A value between 0 and 1
 */
function convertAtomTo3DPoint(type, x, y, z) {

    let red = 0;
    let grn = 0;
    let blu = 0;
    //Oxygen is red
    if( type == "o" ) {
        red = 200;
    }
    //Hydrogen is Cyan
    else if( type == "h" ) {
        grn = 250;
        blu = 250;
    }
    //Carbon is gray
    else if( type == "c" ) {
        red = 100;
        grn = 100;
        blu = 100;
    }
    //nitrogen is blue
    else if( type == "n" ) {
        blu = 200;
    }
    //Chlorine is green
    else if( type == "cl" ) {
        grn = 200;
    }
    //Sulphur is yellow
    else if( type == "s" ) {
        red = 200;
        grn = 200;
    }
    //Phosphorus is orange
    else if( type == "ph" ) {
        red = 250;
        grn = 160;
    }
    //Phosphorus is orange
    else if( type == "na" ) {
        red = 128;
        blu = 128;
    }

    let xOnCanvas = map(x, -1, 1, -30, 30);
    let yOnCanvas = map(y, -1, 1, -30, 30);
    let zOnCanvas = map(z, -1, 1, -30, 30);

    return new ThreeDPoint(xOnCanvas, yOnCanvas, zOnCanvas, red, grn, blu);
}