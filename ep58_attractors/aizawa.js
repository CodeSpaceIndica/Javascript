/**
 * THe Aizawa Attractor.
 */
 class Aizawa extends Chaos {

    constructor() {
        super();

        this.a = 0.95;
        this.b = 0.7;
        this.c = 0.6;
        this.d = 3.5;
        this.e = 0.25;
        this.f = 0.1;

        this.x0 = 0.1;
        this.y0 = 1.0;
        this.z0 = 0.01;
    }

    name() {
        return "Aizawa";
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
            dx = (((z - this.b) * x) - this.d * y) * dt;
            dy = (this.d * x + ((z - this.b) * y)) * dt;
            dz = ((this.c + this.a * z - (z*z*z)/3)
                        - (x*x + y*y) * (1 + this.e * z)
                        + this.f * z * x*x*x) * dt;

            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -3, 3, -xCenter, xCenter);
            let yMap = map(y, -3, 3, -xCenter, xCenter);
            let zMap = map(z, -3, 3, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}