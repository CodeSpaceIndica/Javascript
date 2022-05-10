/**
 * THe Lorentz Attractor.
 */
 class Lorentz extends Chaos {

    constructor() {
        super();

        this.a = 28;
        this.b = 10;
        this.c = 8.0 / 3.0;

        this.x0 = 0.01;
        this.y0 = 0;
        this.z0 = 0;
    }

    name() {
        return "Lorentz";
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
            dx = this.b * (y - x) * dt;
            dy = (x * (this.a - z) - y) * dt;
            dz = (x * y - this.c * z) * dt;
        
            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -40, 40, -xCenter, xCenter);
            let yMap = map(y, -40, 40, -yCenter, yCenter);
            let zMap = map(z, -80, 80, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}