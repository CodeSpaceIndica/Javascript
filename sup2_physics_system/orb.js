class Orb {
    constructor(x, y) {
        //CONSTANTS
        this.RADIUS = 20;
        this.TWO_PI = Math.PI*2;
        this.MAX_VELOCITY = 8;

        this.color = "RGB(" + parseInt(randomBetween(10, 250)) + ", " + 
                              parseInt(randomBetween(10, 250)) + ", " + 
                              parseInt(randomBetween(10, 250)) + ", 50)"
        
        this.position = new Point(x, y);
        this.velocity = new Point(0, 0);

        this.radians = 0;
        this.spokeLineTo = new Point(this.position.x+this.RADIUS, this.y);
    }

    /**
     * Force must be a Point object
     * 
     * @param {*} force 
     */
    addForce(force) {
        this.velocity.x += force.x;
        this.velocity.y += force.y;
    }

    update() {
        if( this.velocity.x > this.MAX_VELOCITY) {
            this.velocity.x = this.MAX_VELOCITY;
        }
        if( this.velocity.x < -this.MAX_VELOCITY) {
            this.velocity.x = -this.MAX_VELOCITY;
        }
        if( this.velocity.y > this.MAX_VELOCITY) {
            this.velocity.y = this.MAX_VELOCITY;
        }
        if( this.velocity.y < -this.MAX_VELOCITY) {
            this.velocity.y = -this.MAX_VELOCITY;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if( this.position.x > width-this.RADIUS || this.position.x < this.RADIUS) {
            this.velocity.x *= -1;
            this.velocity.x *= 0.9;
        }
        if( this.position.x > width-this.RADIUS ) {
            this.position.x = width-this.RADIUS;
        }
        if( this.position.x < this.RADIUS ) {
            this.position.x = this.RADIUS;
        }

        if( this.position.y > height-this.RADIUS || this.position.y < this.RADIUS) {
            this.velocity.y *= -1;
            this.velocity.y *= 0.9;
        }
        if( this.position.y > height-this.RADIUS ) {
            this.position.y = height-this.RADIUS;
        }
        if( this.position.y < this.RADIUS ) {
            this.position.y = this.RADIUS;
        }

        this.spokeLineTo.x = this.position.x + this.RADIUS * Math.cos(this.radians);
        this.spokeLineTo.y = this.position.y + this.RADIUS * Math.sin(this.radians);
        this.radians += this.velocity.x / this.RADIUS;
    }

    render(ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.RADIUS, 0, this.TWO_PI, false);
        ctx.fill();

        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.spokeLineTo.x, this.spokeLineTo.y);
        ctx.stroke();
    }
}