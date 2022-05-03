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
        return "Lorentz83";
    }

    step() {
        this.dx = (-this.a * this.x - this.y*this.y - this.z*this.z + this.a * this.f) * this.dt;
        this.dy = (-this.y + this.x * this.y - this.b * this.x * this.z + this.g) * this.dt;
        this.dz = (-this.z + this.b * this.x * this.y + this.x * this.z) * this.dt;
    
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -5, 5, 0, width);
        this.yMap = map(this.y, -5, 5, 0, height);
    }
}