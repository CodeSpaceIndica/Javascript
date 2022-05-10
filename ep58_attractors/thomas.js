/**
 * THe Thomas Attractor.
 */
 class Thomas extends Chaos {

    constructor() {
        super();

        this.b = 0.208186;

        this.x0 = 1.1;
        this.y0 = 1.1;
        this.z0 = -0.01;
    }

    name() {
        return "Thomas";
    }

    generatePoints() {
        let x = this.x0;
        let y = this.y0;
        let z = this.z0;

        let dx = 0;
        let dy = 0;
        let dz = 0;

        let dt = 0.5;

        let points = [];

        for(let i=0; i<NUM_POINTS; i++) {
            dx = (Math.sin(y) - this.b * x) * dt;
            dy = (Math.sin(z) - this.b * y) * dt;
            dz = (Math.sin(x) - this.b * z) * dt;
        
            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -7, 7, -xCenter, xCenter);
            let yMap = map(y, -7, 7, -yCenter, yCenter);
            let zMap = map(z, -7, 7, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}