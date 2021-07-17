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

    subtract(anotherPoint) {
        return new Point(this.x-anotherPoint.x, this.y-anotherPoint.y);
    }

    normalize() {
        let magnitude = Math.sqrt(this.x*this.x, this.y*this.y);
        if( magnitude != 0 ) {
            return new Point(this.x/magnitude, this.y/magnitude);
        }
        return null;
    }

    limit(maxVal) {
        if( this.x > maxVal ) {
            this.x = maxVal;
        }
        if( this.x < -maxVal ) {
            this.x = -maxVal;
        }
        if( this.y > maxVal ) {
            this.y = maxVal;
        }
        if( this.y < -maxVal ) {
            this.y = -maxVal;
        }
    }
}

/**
 * Class Rectangle. Represents a rectangle having X, Y and width and height.
 */
class Rectangle {
    constructor(xx, yy, ww, hh) {
        this.x = xx;
        this.y = yy;
        this.w = ww;
        this.h = hh;
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

/**
 * Converts the input number to its hexadecimal(base-16) value.
 * Thus, 255 is 'FF'
 * 100 is '16' and
 * 3 is '03'
 * 
 * @param {*} num 
 */
function toHex(num) {
    var hex = num.toString(16);
    if( hex.length < 2 ) {
        hex = "0" + hex;
    }
    return hex;
}

/**
 * Resizes a given canvas element to fit the 
 * width of the window.
 * The height of the canvas is also proportionally 
 * changed.
 * 
 * @param {*} aCanvasElement 
 * @param {*} fitToWidth a boolean that if set will force resize to 
 * width
 */
function resizeCanvas(aCanvasElement, fitToWidth) {
    var w = aCanvasElement.width;
    var h = aCanvasElement.height;
    var screenWidth = document.body.clientWidth;
    if( screenWidth < w || fitToWidth === true ) {
        var ratio = w / h;

        var newWidth  = (screenWidth * 95)/100;
        var newHeight = screenWidth / ratio;
        aCanvasElement.width = newWidth;
        aCanvasElement.height = newHeight;
    }
}

/**
 * Gets the angle in radians between two points.
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 */
function getAngle(x1, y1, x2, y2) {
    let xDiff = x1 - x2;
    let yDiff = y1 - y2;

    let radians = Math.atan2(yDiff, xDiff);

    return radians;
}

/**
 * A constants class to be used through
 * out our development.
 */
class Constants {
}
Constants.RADIANS = Math.PI / 180;
Constants.HALF_PI = Math.PI / 2;
Constants.TWO_PI  = Math.PI * 2;
