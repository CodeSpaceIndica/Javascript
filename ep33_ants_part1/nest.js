/**
 * Defines the ant class and its behaviours.
 */
 class Nest {

    constructor() {
        this.pos = new Point(randomBetween(10, width), randomBetween(10, height));
    }


    render(aCtx) {
        aCtx.fillStyle = "#D7D7D7";

        aCtx.beginPath();
        aCtx.arc(this.pos.x, this.pos.y, 15, 0, Constants.TWO_PI, false);
        aCtx.fill();
    }
}

