
/**
 * Road class
 */
class Road {

    constructor(xx, yy, ww, hh) {
        this.x = xx;
        this.y = yy;
        this.w = ww;
        this.h = hh;
    }

    render(ctx) {
        ctx.fillStyle = "#111111";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
}