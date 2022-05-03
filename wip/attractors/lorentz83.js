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
        return "Lorentz";
    }

    step() {
        this.dx = this.b * (this.y - this.x) * this.dt;
        this.dy = (this.x * (this.a - this.z) - this.y) * this.dt;
        this.dz = (this.x * this.y - this.c * this.z) * this.dt;
    
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -30, 30, 0, width);
        this.yMap = map(this.y, -30, 30, 0, height);
    }
}