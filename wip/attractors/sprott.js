/**
 * THe Sprott Attractor.
 */
 class Sprott extends Chaos {

    constructor() {
        super();

        this.a = 2.07;
        this.b = 1.79;

        this.x0 = 0.63;
        this.y0 = 0.47;
        this.z0 = -0.54;

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
        return "Sprott";
    }

    step() {
        this.dx = (this.y + this.a * this.x * this.y + this.x * this.z) * this.dt;
        this.dy = (1 - this.b * this.x*this.x + this.y*this.z) * this.dt;
        this.dz = (this.x - this.x*this.x - this.y*this.y) * this.dt;

        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;

        this.xMap = map(this.x, -3, 3, 0, width);
        this.yMap = map(this.y, -3, 3, 0, height);
    }
}