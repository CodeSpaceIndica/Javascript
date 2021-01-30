
/**
 * Represents a 2D ball
 */
class Ball {
    constructor(loc, rad) {
        this.location = loc;
        this.radius = rad;

        this.velocity = new Point(0, 0);

        this.isDone = false;
    }

    addForce(aForce) {
        this.velocity.x += aForce.x;
        this.velocity.y += aForce.y;
    }

    update() {
        if( !this.isDone ) {
            this.location.x += this.velocity.x;
            this.location.y += this.velocity.y;

            this.checkCanvasBounds();
            this.checkSpeed();
        }
    }

    //Check Canvas bounds
    checkCanvasBounds() {
        if( this.location.x+this.radius > width ) {
            this.location.x = width-this.radius;
            this.velocity.x *= -COEFF_RESTITUTION;
        }
        if( this.location.x < this.radius ) {
            this.location.x = this.radius;
            this.velocity.x *= -COEFF_RESTITUTION;
        }
        if( this.location.y+this.radius > height ) {
            this.location.y = height-this.radius;
            this.velocity.y *= -COEFF_RESTITUTION;
        }
    }

    //Check if speed exceeds max Speed allowed in this world
    checkSpeed() {
        if( Math.abs(this.velocity.x) > MAX_SPEED) {
            this.velocity.x = this.velocity.x < 0 ? -MAX_SPEED : MAX_SPEED;
        }
        if( Math.abs(this.velocity.y) > MAX_SPEED) {
            this.velocity.y = this.velocity.y < 0 ? -MAX_SPEED : MAX_SPEED;
        }
    }

    render(aCtx) {
        if( !this.isDone ) {
            aCtx.fillStyle = "#339933";
            aCtx.beginPath();
            aCtx.arc(this.location.x, this.location.y, this.radius, 0, Constants.TWO_PI, true);
            aCtx.fill();
        }
    }
}
