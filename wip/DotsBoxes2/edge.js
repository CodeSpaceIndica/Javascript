
/**
 * Class Edge. Represents a rectangle having X, Y and width and height.
 */
class Edge {

    /**
     * When constructing we'll keep in mind that the edge can either be vertical and 
     * horizontal.
     * If it is vertical, we'll give t some thickness in the horizontal direction
     * likewise, if it is horizantal, we'll give t some thickness in the vertical direction
     * 
     * @param {*} x1 
     * @param {*} y1 
     * @param {*} x2 
     * @param {*} y2 
     */
    constructor(x1, y1, x2, y2) {
        this.x1 = x1 - 4;
        this.y1 = y1 - 4;
        this.x2 = x2 + 4;
        this.y2 = y2 + 4;

        this.w = this.x2-this.x1;
        this.h = this.y2-this.y1;
        this.w = this.w == 0 ? 8 : this.w;
        this.h = this.h == 0 ? 8 : this.h;

        this.highlight = false;
        this.checked = false;

        console.log(this.x1, this.y1, this.x2, this.y2);
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

    reset() {
        this.highlight = false;
        this.checked = false;
    }

   render(ctx) {
        ctx.fillStyle = "#EEEEEE";
        if( this.checked ) {
            ctx.fillStyle = "#0099FF";
        }
        else if( this.highlight ) {
            ctx.fillStyle = "#9999CC";
        }
        ctx.beginPath();
        ctx.rect(this.x1, this.y1, this.w, this.h);
        ctx.fill();
    }
}