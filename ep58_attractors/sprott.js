/**
 * THe Sprott Attractor.
 */
 class Sprott extends Chaos {

    constructor() {
        super();

        this.a = 2.07;
        this.b = 1.79;

        this.x0 = 0.63;
        this.y0 = 0.47;
        this.z0 = -0.54;
    }

    name() {
        return "Sprott";
    }

    generatePoints() {
        let x = this.x0;
        let y = this.y0;
        let z = this.z0;

        let dx = 0;
        let dy = 0;
        let dz = 0;

        let dt = 0.05;

        let points = [];

        for(let i=0; i<NUM_POINTS; i++) {
            dx = (y + this.a * x * y + x * z) * dt;
            dy = (1 - this.b * x*x + y*z) * dt;
            dz = (x - x*x - y*y) * dt;

            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -2, 2, -xCenter, xCenter);
            let yMap = map(y, -2, 2, -yCenter, yCenter);
            let zMap = map(z, -2, 2, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}