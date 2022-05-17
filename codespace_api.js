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

    /**
     * adds values of another point to current point
     * 
     * @param {*} anotherPoint 
     * @returns 
     */
     addTo(anotherPoint) {
        this.x += anotherPoint.x;
        this.y += anotherPoint.y;
    }

    /**
     * Subtracts another point from current point.
     * 
     * @param {*} anotherPoint 
     * @returns 
     */
    subtractFrom(anotherPoint) {
        this.x -= anotherPoint.x;
        this.y -= anotherPoint.y;
    }

    /**
     * returns a new point after adding another point from current point.
     * 
     * @param {*} anotherPoint 
     * @returns 
     */
    add(anotherPoint) {
        return new Point(this.x+anotherPoint.x, this.y+anotherPoint.y);
    }

    /**
     * returns a new point after subtracting another point from current point.
     * 
     * @param {*} anotherPoint 
     * @returns 
     */
    subtract(anotherPoint) {
        return new Point(this.x-anotherPoint.x, this.y-anotherPoint.y);
    }

    /**
     * Finds the magnitude and normalizes the result
     * 
     * @returns 
     */
    normalize() {
        let magnitude = Math.sqrt(this.x*this.x + this.y*this.y);
        if( magnitude != 0 ) {
            return new Point(this.x/magnitude, this.y/magnitude);
        }
        return null;
    }

    /**
     * Limits the x and y values of this point object to the maxVal value.
     * 
     * @param {*} maxVal 
     */
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

    /**
     * Same as the getDistance function above, except this compares distance to another point 
     * object pnt
     * 
     * @param {*} pnt 
     */ 
    distanceFrom(pnt) {
        return Math.abs( Math.sqrt( (this.x-pnt.x)*(this.x-pnt.x) + (this.y-pnt.y)*(this.y-pnt.y) ) );
    }

    /**
     * Same as the getDistanceNoSqrt function above
     * object pnt
     * 
     * @param {*} pnt 
     */ 
     distanceFromNoSqrt(pnt) {
        return ((this.x-pnt.x)*(this.x-pnt.x)) + ((this.y-pnt.y)*(this.y-pnt.y)) ;
    }

    /**
     * Clones a point
     */
    clone() {
        return new Point(this.x, this.y);
    }

    /**
     * Copies a point to another point
     */
    copyTo(anotherPoint) {
        anotherPoint.x = this.x;
        anotherPoint.y = this.y;
    }

    /**
     * Check if this point is equal to another point. 
     */
    equals(anotherPoint) {
        return this.x == anotherPoint.x && this.y == anotherPoint.y;
    }
}

/**
 * Class Rectangle. Represents a rectangle having X, Y and width and height.
 */
class Rectangle {
    constructor(x, y, w, h) {
        this.x1 = x;
        this.y1 = y;
        this.w  = w;
        this.h  = h;
        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
    }

    /**
     * Returns true, if a point (x,y) is within the bounds of the rectangle.
     * The borders are NOT counted as being within the rectangle.
     * 
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    contains(x, y) {
        if( x > this.x1 && x < this.x2 && y > this.y1 && y < this.y2 ) {
            return true;
        }
        return false;
    }

    /**
     * Render the current rectangle on to a Context 2D
     * @param {*} ctx 
     */
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x1, this.y1, this.w, this.h);
        ctx.fill();
    }
}

/**
 * @classdesc a class for doing common Matrix operations
 *
 */
class Matrix {
    /**
     * @param {Array} array a 2d array
     */
    constructor(array) {
        let numberOfColumns = array[0].length
        // verify all rows have equal number of elements
        for (const row of array.slice(1)) {
            if (row.length != numberOfColumns) {
                throw new Error('Array provided does not have equal number of elements within sub-Arrays!')
            }
        }
        this.array = array
        this.order = [this.array.length, this.array[0].length]
    }

    /**
     * @param {Number} order the order of the Identity Matrix
     *
     * @return {Matrix} the Identity Matrix of the specified order
     */
    static identity(order) {
        if (order < 2) {
            throw new Error('Invalid Matrix order specified!')
        }

        let array = []
        for (let i = 0; i < order; ++i) {
            let subArray = []
            for (let j = 0; j < order; ++j) {
                if (i == j) {
                    subArray.push(1)
                } else {
                    subArray.push(0)
                }
            }

            array.push(subArray)
        }

        return new Matrix(array)
    }

    /**
     * @param {Matrix} another Matrix
     *
     * @return {Matrix} the sum of both Matrices
     */
    add(matrix) {
        // check if Matrices are compatible
        if (
            !(
                this.order[0] == matrix.order[0] && this.order[1] == matrix.order[1]
            )
        ) {
            throw new Error('Matrices are NOT of the same order!')
        }

        let array = []
        for (let i = 0; i < this.order[0]; ++i) {
            let subArray = []
            for (let j = 0; j < this.order[1]; ++j) {
                subArray.push(0)
            }
            array.push(subArray)
        }

        for (let i = 0; i < this.order[0]; ++i) {
            for (let j = 0; j < this.order[1]; ++j) {
                array[i][j] = this.array[i][j] + matrix.array[i][j]
            }
        }

        return new Matrix(array)
    }

    /**
     * @param {Matrix} another Matrix
     *
     * @return {Matrix} the difference between the Matrices
     */
    subtract(matrix) {
        return this.add(matrix.multiply(-1))
    }

    /**
     * @param {Number|Matrix} scalarOrMatrix a scalar value or another Matrix
     *
     *
     * @return {Matrix} the product of the multiplication
     */
    multiply(scalarOrMatrix) {
        if (typeof scalarOrMatrix == 'number') {
            return this.scalarMultiply(scalarOrMatrix)
        } else if (scalarOrMatrix instanceof Matrix) {
            return this.matrixMultiply(scalarOrMatrix)
        } else {
            throw new TypeError('Unknown type specified!')
        }
    }

    /**
     * @param {Number} a scalar
     *
     * @return {Matrix} the result of the product
     */
    scalarMultiply(scalar) {
        return new Matrix(this.array.map(row => {
            row = row.map(column => column * scalar)
            return row
        }))
    }

    /**
     * @param {Matrix} another Matrix
     *
     * @return {Matrix} the result of the Matrix multiplication
     */
    matrixMultiply(matrix) {
        // check if Matrices are compatible
        if (!this.order[1] == matrix.order[0]) {
            throw new Error('Matrices are NOT of the same order!')
        }

        let array = []
        for (let i = 0; i < this.order[0]; ++i) {
            let subArray = []
            for (let j = 0; j < matrix.order[1]; ++j) {
                subArray.push(0)
            }
            array.push(subArray)
        }

        for (let i = 0; i < this.order[0]; ++i) {
            let row = this.array[i]
            for (let j = 0; j < matrix.order[1]; ++j) {
                let column = Array.from(matrix.array, v => v[j])
                const sum = row.map((el, idx) => [el, column[idx]])
                    .reduce((sum, zip) => sum + zip.reduce((product, el) => product * el, 1), 0)

                array[i][j] = sum
            }
        }

        return new Matrix(array)
    }

    toArray() {
        return this.array
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
    let top = 0;
    let left = 0;

    let obj = canvasObject;
    do
    {
        top += obj.offsetTop;
        left += obj.offsetLeft;
    } while (obj = obj.offsetParent);

    return new Point( Math.floor(mouseEvent.clientX - left + window.pageXOffset), Math.floor(mouseEvent.clientY - top + window.pageYOffset) );
}

/**
 * For a given canvas, find the real location of its touches.
 * DOES NOT WORK FOR MULTIPLE TOUCHES.
 * 
 * @param {*} event 
 * @param {*} canvasObject 
 * @returns 
 */
function getRealTouchLocation(event, canvasObject) {
    let touches = event.changedTouches;
    let boundingRect = canvasObject.getBoundingClientRect();

    touchX = touches[0].clientX - boundingRect.left;
    touchY = touches[0].clientY - boundingRect.top;

    return new Point( touchX, touchY );
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
 * A getDistance funtion WITHOUT the need to use Squareroot. 
 * the Square Root function is expensive on the CPU. 
 * Therefore to check if the distance is less than a given radius, 
 * simply square the radius as well. 
 * 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 * @returns 
 */
function getDistanceNoSqrt(x1, y1, x2, y2) {
    return ((x1 - x2)*(x1 - x2)) + ((y1 - y2)*(y1 - y2));
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
    let r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
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
    let hex = num.toString(16);
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
    let w = aCanvasElement.width;
    let h = aCanvasElement.height;
    let screenWidth = document.body.clientWidth;
    if( screenWidth < w || fitToWidth === true ) {
        let ratio = w / h;

        let newWidth  = (screenWidth * 95)/100;
        let newHeight = screenWidth / ratio;
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
 * Returns the highest power of 2 number for a given parameter.
 * This function exploits a bit operators trick to find if a number
 * is a power of 2.
 * For example
 * 32 & 31 is 0, thus 32 is a power f 2
 * 31 & 30 returns 30 and thus 31 is not a power of two.
 * 
 * @param {*} number 
 * @returns 
 */
function getHighestPowerOfTwo(number) {
    for(let i=number; i>=1; i--) {
        if( (i & (i-1) ) == 0 ) {
            return i;
        }
    }
    return 0;
}

/**
 * Constrain a value in variable "aValue" to be 
 * between a lowerLimit and upperLimit
 * 
 * @param {*} aValue 
 * @param {*} lowerLimit 
 * @param {*} upperLimit 
 * @returns 
 */
function constrain(aValue, lowerLimit, upperLimit) {
    let newValue = aValue;
    newValue = newValue < lowerLimit ? lowerLimit : newValue;
    newValue = newValue > upperLimit ? upperLimit : newValue;

    return newValue;
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
