/**
 * THe Rossler Attractor.
 */
 class Rossler extends Chaos {

    constructor() {
        super();

        this.a = 0.2;
        this.b = 0.2;
        this.c = 5.7;

        this.x0 = 10.0;
        this.y0 = 0;
        this.z0 = 10.0;
    }

    name() {
        return "Rossler";
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
            dx = -(y * z) * dt;
            dy = (x + this.a * y) * dt;
            dz = (this.b + z * (x - this.c)) * dt;

            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -20, 20, -xCenter, xCenter);
            let yMap = map(y, -80, 25, -yCenter, yCenter);
            let zMap = map(z, 1, 50, 0, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }
        
        return points;
    }
}