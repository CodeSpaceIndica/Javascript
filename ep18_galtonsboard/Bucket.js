
/**
 * Represents a bucket into which balls will fall 
 * and collect.
 */
class Bucket {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.fillH = 0;
    }

    render(aCtx) {
        aCtx.strokeStyle = "#777799";
        aCtx.beginPath();
        aCtx.rect(this.x, this.y, this.w, this.h);
        aCtx.stroke();

        aCtx.fillStyle = "#777799";
        aCtx.beginPath();
        aCtx.rect(this.x+1, this.y+this.h-this.fillH, this.w-1, this.fillH);
        aCtx.fill();
    }
}