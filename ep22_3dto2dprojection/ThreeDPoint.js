
/**
 * A 3d Point, AKA Vertex AKA Node.
 */
class ThreeDPoint {
    constructor() {
        this.theta = randomBetween(0, Constants.TWO_PI);
        this.phi   = randomBetween(0, Math.PI);

        // this.x = randomBetween(-xCenter, xCenter);
        // this.y = randomBetween(-yCenter, yCenter);
        // this.z = randomBetween(DEPTH-100, DEPTH-50);
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.radius = MAX_RADIUS;
        this.alpha = 1;

        this.scaleProjected = 0;
        this.xProj = 0;
        this.yProj = 0;

        let r = parseInt( randomBetween(100, 255) );
        let g = parseInt( randomBetween(100, 255) );
        let b = parseInt( randomBetween(100, 255) );
        this.color = "rgb(" + r + "," + g + "," + b + ")";
    }

    update() {
        this.x = GLOBE_RADIUS * Math.sin(this.phi) * Math.cos(this.theta);
        this.y = GLOBE_RADIUS * Math.cos(this.phi);
        this.z = GLOBE_RADIUS * Math.sin(this.phi) * Math.sin(this.theta) + GLOBE_RADIUS;

        this.scaleProjected = DEPTH / (DEPTH + this.z);

        this.xProj = (this.x * this.scaleProjected) + xCenter;
        this.yProj = (this.y * this.scaleProjected) + yCenter;

        this.radius = map(this.z, 0, DEPTH, MAX_RADIUS, 0);
        this.alpha = map(this.z, 0, DEPTH, 1, 0);

        this.theta += 0.01;
    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xProj, this.yProj, this.radius, 0, Constants.TWO_PI, true);
        ctx.fill();
    }
}