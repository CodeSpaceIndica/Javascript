
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
     */
    constructor(vertex1, vertex2) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;

        this.x1 = vertex1.x - 4;
        this.y1 = vertex1.y - 4;
        this.x2 = vertex2.x + 4;
        this.y2 = vertex2.y + 4;

        this.w = this.x2 - this.x1;
        this.h = this.y2 - this.y1;
        this.w = this.w == 0 ? 8 : this.w;
        this.h = this.h == 0 ? 8 : this.h;

        this.highlight = false;
        this.checked = false;
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
     * Set the value of checked to true, and also light up the 
     * two connecting vertices.
     */
    doChecked() {
        this.checked = true;
    }

    /**
     * Reset this edge
     */
    reset() {
        this.highlight = false;
        this.checked = false;
    }

    /**
     * Render the edge on to a context
     * 
     * @param {*} ctx 
     */
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