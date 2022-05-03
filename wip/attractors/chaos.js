/**
 * A parent class to all the attractor clases. 
 * Each attractor implements a different equation
 */
 class Chaos {
     constructor() {
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this.e = 0;
        this.f = 0;
        this.g = 0;

        this.x0 = 0;
        this.y0 = 0;
        this.z0 = 0;

        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.dx = 0;
        this.dy = 0;
        this.dz = 0;

        this.dt = 0;

        //Maps the x and y to the screen.
        this.xMap = 0;
        this.yMap = 0
     }

     init() {
     }

     name() {
     }

     step() {
     }
 }