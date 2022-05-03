/**
 * THe Aizawa Attractor.
 */
 class Aizawa extends Chaos {

    constructor() {
        super();

        this.a = 0.95;
        this.b = 0.7;
        this.c = 0.6;
        this.d = 3.5;
        this.e = 0.25;
        this.f = 0.1;

        this.x0 = 0.1;
        this.y0 = 1.0;
        this.z0 = 0.01;

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
        return "Aizawa";
    }

    step() {
        this.dx = (((this.z - this.b) * this.x) - this.d * this.y) * this.dt;
        this.dy = (this.d * this.x + ((this.z - this.b) * this.y)) * this.dt;
        this.dz = ((this.c + this.a * this.z - (this.z*this.z*this.z)/3)
                    - (this.x*this.x + this.y*this.y) * (1 + this.e * this.z)
                    + this.f * this.z * this.x*this.x*this.x) * this.dt;

        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -3, 3, 0, width);
        this.yMap = map(this.y, -3, 3, 0, height);
    }
}