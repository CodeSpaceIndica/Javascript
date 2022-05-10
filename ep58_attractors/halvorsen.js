/**
 * THe Halvorsen Attractor.
 */
 class Halvorsen extends Chaos {

    constructor() {
        super();

        this.a = 1.89;

        this.x0 = -1.48;
        this.y0 = -1.51;
        this.z0 = 2.04;
    }

    name() {
        return "Halvorsen";
    }

    generatePoints() {
        let x = this.x0;
        let y = this.y0;
        let z = this.z0;

        let dx = 0;
        let dy = 0;
        let dz = 0;

        let dt = 0.01;

        let points = [];

        for(let i=0; i<NUM_POINTS; i++) {
            dx = (-this.a * x - 4 * y - 4 * z - y*y) * dt;
            dy = (-this.a * y - 4 * z - 4 * x - z*z) * dt;
            dz = (-this.a * z - 4 * x - 4 * y - x*x) * dt;

            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -20, 20, -xCenter, xCenter);
            let yMap = map(y, -20, 20, -yCenter, yCenter);
            let zMap = map(z, -20, 20, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}