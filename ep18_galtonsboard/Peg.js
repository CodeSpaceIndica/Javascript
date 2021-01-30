
/**
 * Represents an immovable Peg.
 */
class Peg {
    constructor(loc, rad) {
        this.location = loc;
        this.radius = rad;
    }

    render(aCtx) {
        aCtx.fillStyle = "#993333";
        aCtx.beginPath();
        aCtx.arc(this.location.x, this.location.y, this.radius, 0, Constants.TWO_PI, true);
        aCtx.fill();
    }
}
