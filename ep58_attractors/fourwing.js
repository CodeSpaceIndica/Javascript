/**
 * THe Four-Wing Attractor.
 */
 class FourWing extends Chaos {

    constructor() {
        super();

        this.a = 0.2;
        this.b = 0.01;
        this.c = -0.4;

        this.x0 = 1.3;
        this.y0 = -0.18;
        this.z0 = 0.01;
    }

    name() {
        return "Four-Wing";
    }

    generatePoints() {
        let x = this.x0;
        let y = this.y0;
        let z = this.z0;

        let dx = 0;
        let dy = 0;
        let dz = 0;

        let dt = 0.1;

        let points = [];

        for(let i=0; i<NUM_POINTS; i++) {
            dx = ((this.a*x) + (y*z)) * dt;
            dy = ((this.b*x) + (this.c*y) - (x*z)) * dt;
            dz = (-z - (x*y)) * dt;
        
            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -5, 5, -xCenter, xCenter);
            let yMap = map(y, -5, 5, -yCenter, yCenter);
            let zMap = map(z, -5, 5, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}