/**
 * Defines the ant class and its behaviours.
 */
class Ant {

    constructor() {
        //Represents the current position of the ant.
        this.pos = new Point(nest.pos.x, nest.pos.y);
        this.speed = new Point(0, 0);

        this.searchPoint = new Point(randomBetween(10, width), randomBetween(10, height));

        this.mode = ANT_MODE.FORAGER;

        this.stepCounter = 0;
        this.maxSteps = parseInt( randomBetween(ANT_MIN_STEPS, ANT_MAX_STEPS) );
    }

    step() {
        let distanceToSearchPoint = this.pos.distanceFrom(this.searchPoint);

        if( this.mode == ANT_MODE.FORAGER ) {
            let desiredLocation = this.searchPoint.subtract(this.pos);
            let desiredDirection = desiredLocation.normalize();
            if( desiredDirection != null ) {
                let desiredSpeed = new Point(desiredDirection.x*MAX_ANT_SPEED, desiredDirection.y*MAX_ANT_SPEED);
                let force = desiredSpeed.subtract(this.speed);
                force.limit(MAX_STEER_FORCE);

                this.speed.x += force.x;
                this.speed.y += force.y;
            }

            //Wandering
            if( distanceToSearchPoint > 20 ) {
                this.speed.x += randomBetween(-WANDER_STRENGTH, WANDER_STRENGTH);
                this.speed.y += randomBetween(-WANDER_STRENGTH, WANDER_STRENGTH);
            }

            if( distanceToSearchPoint < 3 ) {
                this.searchPoint = new Point(randomBetween(10, width), randomBetween(10, height));
            }

            this.speed.limit(MAX_ANT_SPEED);

            this.pos.x += this.speed.x;
            this.pos.y += this.speed.y;

            if( this.stepCounter % 5 == 0 ) {
                stepPheromones.push( new Pheromone(this.pos) );
            }

            this.stepCounter++;
        }
        else if( this.mode == ANT_MODE.RETURNER ) {
            
        }

        if( this.stepCounter > this.maxSteps ) {
            this.mode = ANT_MODE.RETURNER;
            this.searchPoint = nest.pos;
            this.stepCounter = 0;
            this.maxSteps = parseInt( randomBetween(ANT_MIN_STEPS, ANT_MAX_STEPS) );
        }
    }

    setSearchPoint(aPoint) {
        this.searchPoint = aPoint;
    }

    render(aCtx) {
        aCtx.fillStyle = "#FFD700";

        aCtx.beginPath();
        aCtx.arc(this.pos.x, this.pos.y, ANT_SIZE, 0, Constants.TWO_PI, false);
        aCtx.fill();

        let angle = getAngle(this.pos.x, this.pos.y, 
            this.pos.x+this.speed.x, this.pos.y+this.speed.y);
        let bX = Math.cos(angle) * ANT_BODY_SIZE + this.pos.x;
        let bY = Math.sin(angle) * ANT_BODY_SIZE + this.pos.y;
        aCtx.beginPath();
        aCtx.arc(bX, bY, ANT_BODY_SIZE, 0, Constants.TWO_PI, false);
        aCtx.fill();
    }
}
