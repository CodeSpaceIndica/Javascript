
/**
 * Class Edge. Represents a rectangle having X, Y and width and height.
 */
 class Edge {
     /**
      * When constructing we'll keep in mind that the edge can either be vertical and 
      * horizontal.
      * If it is vertical, we'll give t some thickness in the horizontal direction
      * likewise, if it is horizantal, we'll give t some thickness in the vertical direction
      * @param {*} x1 
      * @param {*} y1 
      * @param {*} x2 
      * @param {*} y2 
      */
    constructor(x1, y1, x2, y2) {
        let xt = 0;
        let yt = 0;
        if( Math.abs(x1-x2) > 0 ) {
            yt = 2;
        }
        if( Math.abs(y1-y2) > 0 ) {
            xt = 2;
        }
        this.x1 = x1 - yt;
        this.y1 = y1 - xt;
        this.x2 = x2 + yt;
        this.y2 = y2 + xt;
        this.w = this.x2-this.x1;
        this.h = this.y2-this.y1;
        console.log(xt, yt, this.x1, this.y1, this.x2, this.y2, this.w, this.h);
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

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x1, this.y1, this.w, this.h);
        ctx.fill();
    }
}