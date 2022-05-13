/**
 * A parent class to all the attractor clases. 
 * Each attractor implements a different equation
 */
class Chaos {
    /**
     * A constructor of a child class may or may not
     * initialize all of the variables. Not all attractors
     * use all these variables.
     */
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
    }

    /**
     * Simply return a string with the name of the attractor
     */
    name() {
    }

    /**
     * This function must calculate the X, Y and Z variables 
     * for NUM_POINTS and then return an array of ThreeDPoint
     * variables.
     */
    generatePoints() {
    }
}
