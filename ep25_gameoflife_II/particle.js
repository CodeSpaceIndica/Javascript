
class Particle {

    constructor() {
        let randNum = parseInt( randomBetween(1, 6) );
        randNum = randNum > 5 ? 5 : randNum;
        this.type = randNum;

        //Defines a list of types and interactions with them.
        this.interactionList = PARTICLE_INTERACTION[this.type];

        let x = randomBetween(200, width-200);
        let y = randomBetween(200, height-200);
        this.location = new Point(x, y);
        this.velocity = new Point(0, 0);
    }

    /**
     * 
     * @param {*} aForce  a Point Object
     */
    addForce(aForce) {
        this.velocity.x += aForce.x;
        this.velocity.y += aForce.y;

        if( this.velocity.x > MAX_SPEED ) {
            this.velocity.x = MAX_SPEED;
        }
        if( this.velocity.x < -MAX_SPEED ) {
            this.velocity.x = -MAX_SPEED;
        }
        if( this.velocity.y > MAX_SPEED ) {
            this.velocity.y = MAX_SPEED;
        }
        if( this.velocity.y < -MAX_SPEED ) {
            this.velocity.y = -MAX_SPEED;
        }
    }

    /**
     * Update position of this particle
     */
    update() {

        for(let i=0; i<particles.length; i++) {
            if( particles[i] == this ) {
                continue;
            }
            let distance = getDistance(this.location.x, this.location.y, 
                particles[i].location.x, particles[i].location.y);
            if( distance > MAX_INTERACT_DIST ) {
                continue;
            }
            for( let idx in this.interactionList ) {
                let interaction = this.interactionList[idx];
                if( particles[i].type == interaction.TYPE ) {
                    if( distance < interaction.DISTANCE ) {
                        let force = 10 / (distance * distance);
                        if( interaction.INTERACTION == INTERACTION.REPEL ) {
                            force *= -1;
                        }
                        let tangent = Math.atan2(particles[i].location.x-this.location.x,
                            particles[i].location.y-this.location.y);
                        let fX = force * Math.sin(tangent);
                        let fY = force * Math.cos(tangent);
                        let forcePoint = new Point(fX, fY);
                        this.addForce(forcePoint);
                    }
                }
            }

            distance = getDistance(this.location.x+this.velocity.x, 
                                    this.location.y+this.velocity.y, 
                                    particles[i].location.x+particles[i].velocity.x, 
                                    particles[i].location.y+particles[i].velocity.y);
            if( distance < PARTICLE_DIAM ) {
                let force = -10 / (distance * distance);
                let tangent = Math.atan2(particles[i].location.x-this.location.x,
                    particles[i].location.y-this.location.y);
                let fX = force * Math.sin(tangent);
                let fY = force * Math.cos(tangent);
                let forcePoint = new Point(fX, fY);
                this.addForce(forcePoint);
                this.location.x += this.velocity.x;
                this.location.y += this.velocity.y;                
            }
        }

        this.location.x += this.velocity.x;
        this.location.y += this.velocity.y;

        //Wall collision
        if( this.location.x > width-PARTICLE_SIZE || this.location.x < PARTICLE_SIZE ) {
            this.velocity.x *= -1;
            if( this.location.x > width-PARTICLE_SIZE ) {
                this.location.x = width-PARTICLE_SIZE;
            }
            if( this.location.x < PARTICLE_SIZE ) {
                this.location.x = PARTICLE_SIZE;
            }
        }
        if( this.location.y > height-PARTICLE_SIZE || this.location.y < PARTICLE_SIZE ) {
            this.velocity.y *= -1;
            if( this.location.y > height-PARTICLE_SIZE ) {
                this.location.y = height-PARTICLE_SIZE;
            }
            if( this.location.y < PARTICLE_SIZE ) {
                this.location.y = PARTICLE_SIZE;
            }
        }

        this.velocity.x *= VISCOCITY;
        this.velocity.y *= VISCOCITY;
    }

    render(ctx) {
        if( this.type == TYPES.RED ) {
            ctx.fillStyle = COLORS.RED;
        }
        else if( this.type == TYPES.GREEN ) {
            ctx.fillStyle = COLORS.GREEN;
        }
        else if( this.type == TYPES.BLUE ) {
            ctx.fillStyle = COLORS.BLUE;
        }
        else if( this.type == TYPES.YELLOW ) {
            ctx.fillStyle = COLORS.YELLOW;
        }
        else if( this.type == TYPES.PURPLE ) {
            ctx.fillStyle = COLORS.PURPLE;
        }

        ctx.beginPath();
        ctx.arc(this.location.x, this.location.y, 
            PARTICLE_SIZE, 0, Constants.TWO_PI, true);
        ctx.fill();
    }
}