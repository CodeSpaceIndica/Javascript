/**
 * Bob of a pendulum.
 */
class Bob {
    constructor(pivot, mass, theta, length, clr) {
        this.pivot = pivot;
        this.mass = mass;
        this.radius = this.mass * width / 200;
        //Theta is in Radian and NOT degrees.
        this.theta = theta;
        this.location = new Point(0, 0);
        this.fulcrumLength = length;
        //Represents the angular velocity(or speed).
        this.velocity = 0;

        this.color = clr;
    }

    updateLocation() {
        this.location.x = Math.sin(this.theta) * this.fulcrumLength + this.pivot.x;
        this.location.y = Math.cos(this.theta) * this.fulcrumLength + this.pivot.y;
    }

    update() {
        this.updateLocation();

        //Calculate angular acceleration
        var acclr = -G / this.fulcrumLength * Math.sin(this.theta);
        //Add acceleration to Angular Velocity
        this.velocity += acclr;
        //Angular Velocity is added to Theta.
        this.theta += this.velocity;

        this.velocity *= DAMPING;
    }

    render(aCtx) {
        aCtx.strokeStyle = this.color;
        aCtx.fillStyle = this.color;

        aCtx.beginPath();
        aCtx.moveTo(this.pivot.x, this.pivot.y);
        aCtx.lineTo(this.location.x, this.location.y);
        aCtx.stroke();
    
        aCtx.beginPath();
        aCtx.arc(this.location.x, this.location.y, this.radius, 0, TWO_PI, true);
        aCtx.fill();
    }
}
