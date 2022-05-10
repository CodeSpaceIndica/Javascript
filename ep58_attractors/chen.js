/**
 * THe Chen Attractor.
 */
 class Chen extends Chaos {

    constructor() {
        super();

        this.a = 5;
        this.b = -10;
        this.c = -0.38;

        this.x0 = 5;
        this.y0 = 10;
        this.z0 = 10;
    }

    name() {
        return "Chen";
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
            dx = (this.a * x - y * z) * dt;
            dy = (this.b * y + x * z) * dt;
            dz = (this.c * z + x * y / 3) * dt;
        
            x += dx;
            y += dy;
            z += dz;
        
            let xMap = map(x, -35, 35, -xCenter, xCenter);
            let yMap = map(y, -35, 35, -yCenter, yCenter);
            let zMap = map(z, -35, 35, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}