/**
 * A Boid class. A boid is a digital equivalent of a bird.
 * A boid is an amalgamation of two words bot + bird.
 */
class Boid {
    constructor(inpX, inpY, inpSX, inpSY, clr) {
        this.x = inpX;
        this.y = inpY;

        this.speedX = inpSX;
        this.speedY = inpSY;

        this.clr = clr;
    }

    addSpeed(aSpeed) {
        this.speedX += aSpeed.x;
        if( this.speedX < minVelocity ) {
            this.speedX = minVelocity;
        }
        if( this.speedX > maxVelocity ) {
            this.speedX = maxVelocity;
        }

        this.speedY += aSpeed.y;
        if( this.speedY < minVelocity ) {
            this.speedY = minVelocity;
        }
        if( this.speedY > maxVelocity ) {
            this.speedY = maxVelocity;
        }
    }

    update() {
        this.x += this.speedX;
        if( this.x > width+boidSize ) {
            let ang = getAngle(this.x, this.y, width/2, height/2);
            this.speedX -= Math.cos(ang);
            this.speedY -= Math.sin(ang);
        }
        if( this.x < 0-boidSize ) {
            let ang = getAngle(this.x, this.y, width/2, height/2);
            this.speedX -= Math.cos(ang);
            this.speedY -= Math.sin(ang);
        }

        this.y += this.speedY;
        if( this.y > height+boidSize ) {
            let ang = getAngle(this.x, this.y, width/2, height/2);
            this.speedX -= Math.cos(ang);
            this.speedY -= Math.sin(ang);
        }
        if( this.y < 0-boidSize ) {
            let ang = getAngle(this.x, this.y, width/2, height/2);
            this.speedX -= Math.cos(ang);
            this.speedY -= Math.sin(ang);
        }
    }

    render(aCtx) {
        aCtx.fillStyle = this.clr;

        aCtx.beginPath();
        aCtx.moveTo(this.x, this.y);

        let angle = getAngle(this.x, this.y, this.x+this.speedX, this.y+this.speedY);
        let xPoly = Math.cos(angle-0.3) * boidSize + this.x;
        let yPoly = Math.sin(angle-0.3) * boidSize + this.y;
        aCtx.lineTo(xPoly, yPoly);

        xPoly = Math.cos(angle+0.3) * boidSize + this.x;
        yPoly = Math.sin(angle+0.3) * boidSize + this.y;
        aCtx.lineTo(xPoly, yPoly);

        aCtx.closePath();

        aCtx.fill();
    }
}
