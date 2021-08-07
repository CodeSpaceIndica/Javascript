/**
 * Defines the ant class and its behaviours.
 */
class Ant {

    constructor() {
        //Represents the current position of the ant.
        this.pos = new Point(nest.pos.x, nest.pos.y);
        this.speed = new Point(0, 0);
        this.steerForce = ANT_STEER_FORCE_NORM;

        this.searchPoint = new Point(randomBetween(10, width), randomBetween(10, height));

        this.mode = ANT_MODE.FORAGER;

        this.stepCounter = 0;
        this.maxSteps = parseInt( randomBetween(ANT_MIN_STEPS, ANT_MAX_STEPS) );

        this.lastPheromone = this.pos.clone();

        this.foodBite = 0;
    }

    step() {
        //Pre calculate the distance to the search point
        //Remember when comparing use square of the radius. 
        //Thus, if you want to check if this value is within 20 pixels,
        //the comparison must be ( distanceToSearchPoint <= (20*20) )
        //or ( distanceToSearchPoint <= 400 )
        let distanceToSearchPoint = this.pos.distanceFromNoSqrt(this.searchPoint);

        //Precalcute the distance from the nest 
        let nestDistance = this.pos.distanceFromNoSqrt(nest.pos);


        let desiredLocation = this.searchPoint.subtract(this.pos);
        let desiredDirection = desiredLocation.normalize();
        if( desiredDirection != null ) {
            let desiredSpeed = new Point(desiredDirection.x*ANT_MAX_SPEED, desiredDirection.y*ANT_MAX_SPEED);
            let force = desiredSpeed.subtract(this.speed);
            force.limit(this.steerForce);

            this.speed.x += force.x;
            this.speed.y += force.y;
            this.speed.limit(ANT_MAX_SPEED);
        }

        if( this.mode == ANT_MODE.FORAGER ) {
            //Wandering
            if( distanceToSearchPoint > 400 ) {
                this.speed.x += randomBetween(-ANT_WANDER_STRENGTH, ANT_WANDER_STRENGTH);
                this.speed.y += randomBetween(-ANT_WANDER_STRENGTH, ANT_WANDER_STRENGTH);
                this.speed.limit(ANT_MAX_SPEED);
            }
            if( distanceToSearchPoint < 9 ) {
                this.searchPoint = new Point(randomBetween(10, width), randomBetween(10, height));
            }

            if( this.stepCounter % 7 == 0 ) {
                stepPheromones.push( new PathPheromone(this.pos) );
                this.lastPheromone.x = this.pos.x;
                this.lastPheromone.y = this.pos.y;
            }

            if( this.stepCounter > this.maxSteps ) {
                this.mode = ANT_MODE.RETURNER;
                this.searchPoint = this.lastPheromone;
                this.stepCounter = 0;
                //this.steerForce = ANT_STEER_FORCE_MAX;
                this.maxSteps = parseInt( randomBetween(ANT_MIN_STEPS, ANT_MAX_STEPS) );
            }
        }
        else if( this.mode == ANT_MODE.RETURNER ) {
            let minPheromone = 1;
            for(let i=0; i<stepPheromones.length; i++) {
                if( stepPheromones[i].strength > 0.2 ) {
                    let xx = (stepPheromones[i].pos.x - this.pos.x)*(stepPheromones[i].pos.x - this.pos.x);
                    let yy = (stepPheromones[i].pos.y - this.pos.y)*(stepPheromones[i].pos.y - this.pos.y);
                    if( xx + yy <= ANT_SMELL_AREA ) {
                        if( stepPheromones[i].strength < minPheromone ) {
                            stepPheromones[i].pos.copyTo(this.searchPoint);
                            minPheromone = stepPheromones[i].strength;
                        }
                    }
                }
            }
        }
        else if( this.mode == ANT_MODE.FOODIE ) {
            if( this.foodBite > 0 ) {
                let minPheromone = 1;
                for(let i=0; i<stepPheromones.length; i++) {
                    let xx = (stepPheromones[i].pos.x - this.pos.x)*(stepPheromones[i].pos.x - this.pos.x);
                    let yy = (stepPheromones[i].pos.y - this.pos.y)*(stepPheromones[i].pos.y - this.pos.y);
                    if( xx + yy <= ANT_SMELL_AREA ) {
                        if( stepPheromones[i].strength < minPheromone ) {
                            stepPheromones[i].pos.copyTo(this.searchPoint);
                            minPheromone = stepPheromones[i].strength;
                        }
                    }
                }

                if( this.stepCounter % 7 == 0 && nestDistance > 49 ) {
                    foodPheromones.push( new FoodPheromone(this.pos) );
                    this.lastPheromone.x = this.pos.x;
                    this.lastPheromone.y = this.pos.y;
                }
            }
            else {
                //Follow food pheromone.
                let minPheromone = 1;
                for(let i=0; i<foodPheromones.length; i++) {
                    let xx = (foodPheromones[i].pos.x - this.pos.x)*(foodPheromones[i].pos.x - this.pos.x);
                    let yy = (foodPheromones[i].pos.y - this.pos.y)*(foodPheromones[i].pos.y - this.pos.y);
                    if( xx + yy <= ANT_SMELL_AREA ) {
                        if( foodPheromones[i].strength < minPheromone ) {
                            foodPheromones[i].pos.copyTo(this.searchPoint);
                            minPheromone = foodPheromones[i].strength;
                        }
                    }
                }

                if( this.stepCounter % 7 == 0 && nestDistance > 49 ) {
                    stepPheromones.push( new PathPheromone(this.pos) );
                    this.lastPheromone.x = this.pos.x;
                    this.lastPheromone.y = this.pos.y;
                }
            }
        }

        for(let i=0; i<foods.length; i++) {
            let xx = (foods[i].pos.x - this.pos.x)*(foods[i].pos.x - this.pos.x);
            let yy = (foods[i].pos.y - this.pos.y)*(foods[i].pos.y - this.pos.y);
            if( xx + yy <= ANT_SMELL_AREA+(foods[i].foodArea) ) {
                if( this.foodBite == 0 ) {
                    foods[i].takeBite(this);
                    this.mode = ANT_MODE.FOODIE;
                    this.stepCounter = 0;
                    this.steerForce = ANT_STEER_FORCE_MAX;
                }
            }
        }

        if( nestDistance <= 49 ) {
            if( this.foodBite == 0 && this.mode == ANT_MODE.RETURNER ) {
                this.mode = ANT_MODE.FORAGER;
                this.stepCounter = 0;
                this.steerForce = ANT_STEER_FORCE_NORM;
                this.maxSteps = parseInt( randomBetween(ANT_MIN_STEPS, ANT_MAX_STEPS) );
            }
            else if( this.foodBite > 0 && this.mode == ANT_MODE.FOODIE ) {
                this.foodBite = 0;
                this.stepCounter = 0;
                this.searchPoint = this.lastPheromone;
            }
        }

        this.stepCounter++;

        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }

    setSearchPoint(aPoint) {
        this.searchPoint = aPoint;
    }

    render(aCtx) {
        aCtx.fillStyle = "#FFD7D7";
        aCtx.beginPath();
        aCtx.arc(this.searchPoint.x, this.searchPoint.y, 3, 0, Constants.TWO_PI, false);
        aCtx.fill();

        aCtx.fillStyle = "#FFD700";
        if( this.foodBite > 0 ) {
            aCtx.fillStyle = "#00FF00";
        }
        aCtx.beginPath();
        aCtx.arc(this.pos.x, this.pos.y, ANT_SIZE, 0, Constants.TWO_PI, false);
        aCtx.fill();

        aCtx.fillStyle = "#FFD700";
        let angle = getAngle(this.pos.x, this.pos.y, 
            this.pos.x+this.speed.x, this.pos.y+this.speed.y);
        let bX = Math.cos(angle) * ANT_BODY_SIZE + this.pos.x;
        let bY = Math.sin(angle) * ANT_BODY_SIZE + this.pos.y;
        aCtx.beginPath();
        aCtx.arc(bX, bY, ANT_BODY_SIZE, 0, Constants.TWO_PI, false);
        aCtx.fill();

        // aCtx.strokeStyle = "#FF0000";
        // aCtx.beginPath();
        // aCtx.arc(this.pos.x, this.pos.y, ANT_SMELL_DISTANCE, 0, Constants.TWO_PI, false);
        // aCtx.stroke();

        // aCtx.strokeStyle = "#FF0000";
        // let h1X = Math.cos(angle-FOURTH_PI) * -30 + this.pos.x;
        // let h1Y = Math.sin(angle-FOURTH_PI) * -30 + this.pos.y;
        // let h2X = Math.cos(angle+FOURTH_PI) * -30 + this.pos.x;
        // let h2Y = Math.sin(angle+FOURTH_PI) * -30 + this.pos.y;
        // aCtx.beginPath();
        // aCtx.moveTo(this.pos.x, this.pos.y);
        // aCtx.lineTo(h1X, h1Y);
        // aCtx.lineTo(h2X, h2Y);
        // aCtx.lineTo(this.pos.x, this.pos.y);
        // aCtx.stroke();
    }
}
