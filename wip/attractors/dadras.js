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
        return "Dadras";
    }

    step() {
        this.dx = (this.y - this.a * this.x + this.b * this.y * this.z) * this.dt;
        this.dy = (this.c * this.y - this.x * this.z + this.z) * this.dt;
        this.dz = (this.d * this.x * this.y - this.e * this.z) * this.dt;

        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;

        this.xMap = map(this.x, -20, 20, 0, width);
        this.yMap = map(this.y, -20, 20, 0, height);
    }
}