class Orb {
    constructor(childDNA) {
        //CONSTANTS
        this.RADIUS = 20;
        this.TWO_PI = Math.PI*2;
        this.MAX_VELOCITY = 8;

        this.color = "rgba(" + parseInt(randomBetween(10, 250)) + ", " + 
                              parseInt(randomBetween(10, 250)) + ", " + 
                              parseInt(randomBetween(10, 250)) + ", 0.7)";
        this.position = new Point(30, height-40);
        this.velocity = new Point(0, 0);

        if( childDNA ) {
            this.DNA = childDNA;
        }
        else {
            this.DNA = [];
            for(var i=0; i<GENE_LENGTH; i++) {
                var gene = new Point(
                    randomBetween(-0.3, 0.3), //X force
                    randomBetween(-0.9, 0), //Y force
                );
                this.DNA.push(gene);
            }
        }

        this.isAlive = true;
        this.isVictorious = false;
        this.victoryAtWhichGene = 0;

        this.fitness = 0;

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

    update(index) {
        if( index > this.DNA.length-1 )  {
            this.isAlive = false;
            return;
        }

        for(var i=0; i<obstacles.length; i++) {
            var dist = getDistance(this.position.x, this.position.y, 
                obstacles[i].position.x, obstacles[i].position.y);
            if( dist < this.RADIUS ) {
                this.isAlive = false;
                return;
            }
        }

        if( this.position.x > target.x ) {
            this.isVictorious = true;
            this.victoryAtWhichGene = index;
            return;
        }

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

        this.velocity.x += this.DNA[index].x;
        this.velocity.y += this.DNA[index].y;

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
        if( this.isAlive ) {
            ctx.fillStyle = this.color;
        }
        else {
            ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        }
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.RADIUS, 0, this.TWO_PI, false);
        ctx.fill();
        if( this.isVictorious ) {
            ctx.strokeStyle = "#00FF00";
        }
        ctx.stroke();

        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.spokeLineTo.x, this.spokeLineTo.y);
        ctx.stroke();
    }

    calculateFitness() {
        var distance = target.x - this.position.x;
        this.fitness = map(distance, 0, width, 0.8, 0);

        if( this.isVictorious ) {
            this.fitness = map(this.victoryAtWhichGene, 0, GENE_LENGTH, 1, 0.9);
        }
    }
}