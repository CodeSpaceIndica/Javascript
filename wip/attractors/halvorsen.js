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

        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;

        this.dx = 0;
        this.dy = 0;
        this.dz = 0;

        this.dt = 0.01;

        //Maps the x and y to the screen.
        this.xMap = 0;
        this.yMap = 0;
    }

    init() {
    }

    name() {
        return "Halvorsen";
    }

    step() {
        this.dx = (-this.a * this.x - 4 * this.y - 4 * this.z - this.y*this.y) * this.dt;
        this.dy = (-this.a * this.y - 4 * this.z - 4 * this.x - this.z*this.z) * this.dt;
        this.dz = (-this.a * this.z - 4 * this.x - 4 * this.y - this.x*this.x) * this.dt;
    
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -15, 15, 0, width);
        this.yMap = map(this.y, -15, 15, 0, height);
    }
}