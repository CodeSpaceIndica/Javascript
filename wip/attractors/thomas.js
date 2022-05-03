/**
 * THe Thomas Attractor.
 */
 class Thomas extends Chaos {

    constructor() {
        super();

        this.a = 0;
        this.b = 0.208186;
        this.c = 0;

        this.x0 = 1.1;
        this.y0 = 1.1;
        this.z0 = -0.01;

        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;

        this.dx = 0;
        this.dy = 0;
        this.dz = 0;

        this.dt = 0.1;

        //Maps the x and y to the screen.
        this.xMap = 0;
        this.yMap = 0;
    }

    init() {
    }

    name() {
        return "Thomas";
    }

    step() {
        this.dx = (Math.sin(this.y) - this.b * this.x) * this.dt;
        this.dy = (Math.sin(this.z) - this.b * this.y) * this.dt;
        this.dz = (Math.sin(this.x) - this.b * this.z) * this.dt;
    
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    
        this.xMap = map(this.x, -5, 5, 0, width);
        this.yMap = map(this.y, -5, 5, 0, height);
    }
}