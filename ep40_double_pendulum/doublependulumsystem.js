/**
 * Class DoublePendulumSystem 
 * Each Double-Pendulum-System contains two pendulums.
 * 
 **/
class DoublePendulumSystem {
    constructor(oPoint, traceClr) {
        this.originPoint = oPoint;
        this.traceClr = traceClr;

        let min = height / 4;
        let max = (height / 2) - 20;

        this.pendulum1 = new Pendulum(randomBetween(min, max), 
                    randomBetween(10, 15), 
                    randomBetween(1, Math.PI), 0);

        this.pendulum2 = new Pendulum(randomBetween(min, max), 
                    randomBetween(10, 15), 
                    randomBetween(1, Math.PI/2), 0);

        let x1 = this.originPoint.x + (this.pendulum1.length * Math.sin(this.pendulum1.angle));
        let y1 = this.originPoint.y + (this.pendulum1.length * Math.cos(this.pendulum1.angle));
        this.px = x1 + (this.pendulum2.length * Math.sin(this.pendulum2.angle));
        this.py = y1 + (this.pendulum2.length * Math.cos(this.pendulum2.angle));
    }

    clone() {
        let newDPSystem = new DoublePendulumSystem(this.originPoint, this.traceClr);
        newDPSystem.pendulum1 = this.pendulum1.clone();
        newDPSystem.pendulum2 = this.pendulum2.clone();
        newDPSystem.px = this.px;
        newDPSystem.py = this.py;

        return newDPSystem;
    }

    update() {
        //Calculate first bobs' angular acceleration
        var angAccPendulum1 = ( -G * (2 * this.pendulum1.mass + this.pendulum2.mass) * Math.sin(this.pendulum1.angle)
                                - this.pendulum2.mass * G * Math.sin(this.pendulum1.angle - 2 * this.pendulum2.angle)
                                - 2 * Math.sin(this.pendulum1.angle - this.pendulum2.angle) * this.pendulum2.mass 
                                    * (this.pendulum2.velocity*this.pendulum2.velocity*this.pendulum2.length 
                                    + this.pendulum1.velocity*this.pendulum1.velocity*this.pendulum1.length * Math.cos(this.pendulum1.angle-this.pendulum2.angle))
                            )
                            /
                            ( this.pendulum1.length * (2 * this.pendulum1.mass+this.pendulum2.mass - this.pendulum2.mass 
                                                    * Math.cos(2*this.pendulum1.angle - 2*this.pendulum2.angle) )
                            );
        //Calculate second bobs' angular acceleration
        var angAccPendulum2 = (2 * Math.sin(this.pendulum1.angle - this.pendulum2.angle) 
                                    * (this.pendulum1.velocity*this.pendulum1.velocity * this.pendulum1.length * (this.pendulum1.mass + this.pendulum2.mass)
                                    + G * (this.pendulum1.mass + this.pendulum2.mass) * Math.cos(this.pendulum1.angle)
                                    + this.pendulum2.velocity*this.pendulum2.velocity * this.pendulum2.length * this.pendulum2.mass
                                    * Math.cos(this.pendulum1.angle-this.pendulum2.angle))
                            )
                            /
                            (
                                this.pendulum2.length * (2 * this.pendulum1.mass + this.pendulum2.mass 
                                    - this.pendulum2.mass * Math.cos(2 * this.pendulum1.angle - 2 * this.pendulum2.angle) )
                            );

                            //Add the acceleration to the velocity.
        this.pendulum1.velocity += angAccPendulum1;
        this.pendulum2.velocity += angAccPendulum2;

        //Add the velocity to the angles.
        this.pendulum1.angle += this.pendulum1.velocity;
        this.pendulum2.angle += this.pendulum2.velocity;

        //Damp Velocity.
        this.pendulum1.velocity *= damping;
        this.pendulum2.velocity *= damping;
    }

    render(aCtx, oCtx) {
        //Render the lines first.
        //Line of the first pendulum
        aCtx.strokeStyle = "#FFFFFF";
        let x1 = this.originPoint.x + (this.pendulum1.length * Math.sin(this.pendulum1.angle));
        let y1 = this.originPoint.y + (this.pendulum1.length * Math.cos(this.pendulum1.angle));
        aCtx.beginPath();
        aCtx.moveTo(this.originPoint.x, this.originPoint.y);
        aCtx.lineTo(x1, y1);
        aCtx.stroke();

        //line of the second pendulum
        let x2 = x1 + (this.pendulum2.length * Math.sin(this.pendulum2.angle));
        let y2 = y1 + (this.pendulum2.length * Math.cos(this.pendulum2.angle));
        aCtx.beginPath();
        aCtx.moveTo(x1, y1);
        aCtx.lineTo(x2, y2);
        aCtx.stroke();

        //Render the Bobs AFTER, so that the lines are behind the bobs.
        //Bob of the first pendulum
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(x1, y1, this.pendulum1.mass, 0, Constants.TWO_PI, true);
        ctx.fill();

        //Bob of the second pendulum
        ctx.fillStyle = "#00FF00";
        ctx.beginPath();
        ctx.arc(x2, y2, this.pendulum2.mass, 0, Constants.TWO_PI, true);
        ctx.fill();

        //Draw trace on the offscreen context
        oCtx.strokeStyle = this.traceClr;
        oCtx.beginPath();
        oCtx.moveTo(x2, y2);
        oCtx.lineTo(this.px, this.py);
        oCtx.stroke();

        this.px = x2;
        this.py = y2;
    }
}
