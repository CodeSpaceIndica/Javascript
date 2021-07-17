/**
 * Defines the ant class and its behaviours.
 */
class Ant {

    constructor(antType) {
        this.type = antType;

        this.size = 10;
        this.bodySize = this.size * 1.2;

        //Represents the current position of the ant.
        this.pos = new Point(width/2, height/2);
        this.speed = new Point(0, 0);

        this.searchPoint = new Point(randomBetween(10, width), 
                                    randomBetween(10, height));
    }

    step() {
        let desiredLocation = this.searchPoint.subtract(this.pos);
        let desiredDirection = desiredLocation.normalize();
        if( desiredDirection != null ) {
            let desiredSpeed = new Point(desiredDirection.x*MAX_ANT_SPEED,
                desiredDirection.y*MAX_ANT_SPEED);
            let force = desiredSpeed.subtract(this.speed);
            force.limit(MAX_STEER_FORCE);

            this.speed.x += force.x;
            this.speed.y += force.y;
            this.speed.limit(MAX_ANT_SPEED);
        }

        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }

    setSearchPoint(aPoint) {
        this.searchPoint = aPoint;
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

        aCtx.fillStyle = "#00FF00";
        aCtx.beginPath();
        aCtx.arc(this.searchPoint.x, this.searchPoint.y, 3, 
            0, Constants.TWO_PI, false);
        aCtx.fill();
    }
}
