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


/** 
 * Helper method that converts hue to rgb 
 **/
function hue2rgb(p, q, t) {
    if(t < 0) {
        t += 1;
    }
    if(t > 1) {
        t -= 1;
    }
    if(t < 1/6) {
        return p + (q - p) * 6 * t;
    }
    if(t < 1/2) {
        return q;
    }
    if(t < 2/3) {
        return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
}


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function HSLtoRGB(h, s, l) {
    var r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}