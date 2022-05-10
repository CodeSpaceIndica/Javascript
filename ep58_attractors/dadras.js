/**
 * THe Dadras Attractor.
 */
 class Dadras extends Chaos {
    constructor() {
        super();

        this.a = 3;
        this.b = 2.7;
        this.c = 1.7;
        this.d = 2;
        this.e = 9;

        this.x0 = 1.1;
        this.y0 = 2.1;
        this.z0 = -2.00;
    }

    name() {
        return "Dadras";
    }

    generatePoints() {
        let x = this.x0;
        let y = this.y0;
        let z = this.z0;

        let dx = 0;
        let dy = 0;
        let dz = 0;

        let dt = 0.02;

        let points = [];
        
        for(let i=0; i<NUM_POINTS; i++) {
            dx = (y - this.a * x + this.b * y * z) * dt;
            dy = (this.c * y - x * z + z) * dt;
            dz = (this.d * x * y - this.e * z) * dt;

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