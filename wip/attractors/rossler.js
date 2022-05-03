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
        return "Rossler";
    }

    step() {
        this.dx = -(this.y * this.z) * this.dt;
        this.dy = (this.x + this.a * this.y) * this.dt;
        this.dz = (this.b + this.z * (this.x - this.c)) * this.dt;

        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -100, 100, 0, width);
        this.yMap = map(this.y, -100, 100, 0, height);
    }
}