/**
 * Class Point. Represents a point having an X and Y co-ordinate
 */
class Point {
    constructor(xx, yy) {
        this.x = xx;
        this.y = yy;
    }

    log() {
        console.log(this.x + "," + this.y);
    }
}

/**
 * Maps a number of a given input range to a number of the output range.
 * 
 * @param {*} inputNum 
 * @param {*} minInput 
 * @param {*} maxInput 
 * @param {*} minOutput 
 * @param {*} maxOutput 
 */
function map(inputNum, minInput, maxInput, minOutput, maxOutput) {
    return (inputNum - minInput) * (maxOutput - minOutput) / (maxInput - minInput) + minOutput;
}

/**
 * for a given canvas find the real location of its clicks.
 * 
 * @param {*} mouseEvent 
 * @param {*} canvasObject 
 */
function getRealMousePosition(mouseEvent, canvasObject) {
    var top = 0;
    var left = 0;

    var obj = canvasObject;
    do
    {
        top += obj.offsetTop;
        left += obj.offsetLeft;
    } while (obj = obj.offsetParent);

    return new Point( Math.floor(mouseEvent.clientX - left + window.pageXOffset), Math.floor(mouseEvent.clientY - top + window.pageYOffset) );
}

/**
 * Returns a random value between a minimum and maximum value.
 * Note: ALSO WORKS WITH NEGATIVE NUMBERS.
 * 
 * @param {*} min 
 * @param {*} max 
 */
function randomBetween(min, max) {
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }
    else {
        return min + Math.random() * (max - min);
    }
}


/**
 * A simple hypotenuse calculation returns the 
 * distance between two points.
 * 
 * hypotenuse = SquareRoot of ( square of (length of side 1) + square of (length of side 2) )
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 */ 
function getDistance(x1, y1, x2, y2) {
    return Math.abs( Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ) );
}
