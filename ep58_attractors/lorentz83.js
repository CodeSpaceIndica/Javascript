/**
 * THe Lorentz83 Attractor.
 */
 class Lorentz83 extends Chaos {

    constructor() {
        super();

        this.a = 0.95;
        this.b = 7.91;
        this.f = 4.83;
        this.g = 4.66;

        this.x0 = -0.2;
        this.y0 = -2.82;
        this.z0 = 2.71;
    }

    name() {
        return "Lorentz83";
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
            dx = (-this.a * x - y*y - z*z + this.a * this.f) * dt;
            dy = (-y + x * y - this.b * x * z + this.g) * dt;
            dz = (-z + this.b * x * y + x * z) * dt;
        
            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -6, 6, -xCenter, xCenter);
            let yMap = map(y, -6, 6, -yCenter, yCenter);
            let zMap = map(z, -6, 6, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}