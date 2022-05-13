/**
 * THe THREE-SCROLL UNIFIED CHAOTIC SYSTEM Attractor.
 */
 class TSUCS extends Chaos {

    constructor() {
        super();

        this.a = 32.48;
        this.b = 45.84;
        this.c = 1.18;
        this.d = 0.13;
        this.e = 0.57;
        this.f = 14.7;

        this.x0 = -0.29;
        this.y0 = -0.25;
        this.z0 = -0.59;
    }

    name() {
        return "Three-Scroll Unified Chaotic System";
    }

    generatePoints() {
        let x = this.x0;
        let y = this.y0;
        let z = this.z0;

        let dx = 0;
        let dy = 0;
        let dz = 0;

        let dt = 0.001;

        let points = [];
        
        for(let i=0; i<NUM_POINTS; i++) {
            dx = (this.a * (y - x) + this.d * x * z) * dt;
            dy = ((this.b * x) - (x * z) + (this.f * y)) * dt;
            dz = ((this.c * z) + (x * y) - (this.e * x * x)) * dt;

            x += dx;
            y += dy;
            z += dz;

            let xMap = map(x, -610, 610, -xCenter, xCenter);
            let yMap = map(y, -610, 610, -xCenter, xCenter);
            let zMap = map(z, -610, 610, -DEPTH, DEPTH);

            points.push( new ThreeDPoint(xMap, yMap, zMap) );
        }

        return points;
    }
}