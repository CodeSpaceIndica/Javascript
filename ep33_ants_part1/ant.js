
/**
 * Defines the ant class and its behaviours.
 */
class Ant {

    constructor(antType) {
        this.type = antType;

        this.size = 10;
        this.bodySize = this.size * 1.2;

        //Represents the current position of the ant.
        this.pos = new Point(100, 100);
        this.speed = new Point(1, 1);
    }

    step() {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;

        this.speed.x += randomBetween(-0.5, 0.5);
        this.speed.y += randomBetween(-0.5, 0.5);
    }

    render(aCtx) {
        aCtx.fillStyle = "#FFD700";

        aCtx.beginPath();
        aCtx.arc(this.pos.x, this.pos.y, this.size, 0, Constants.TWO_PI, false);
        aCtx.fill();

        let angle = getAngle(this.pos.x, this.pos.y, 
            this.pos.x+this.speed.x, this.pos.y+this.speed.y);
        let bX = Math.cos(angle) * this.bodySize + this.pos.x;
        let bY = Math.sin(angle) * this.bodySize + this.pos.y;
        aCtx.beginPath();
        aCtx.arc(bX, bY, this.bodySize, 0, Constants.TWO_PI, false);
        aCtx.fill();
    }
}