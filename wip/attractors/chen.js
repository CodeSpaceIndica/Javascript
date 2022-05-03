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
        return "Chen";
    }

    step() {
        this.dx = (this.a * this.x - this.y * this.z) * this.dt;
        this.dy = (this.b * this.y + this.x * this.z) * this.dt;
        this.dz = (this.c * this.z + this.x * this.y / 3) * this.dt;
    
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -30, 30, 0, width);
        this.yMap = map(this.y, -30, 30, 0, height);
    }
}