//Class Pendulum
class Pendulum {
    constructor(len, mas, ang, vel) {
        this.length   = len; //Rod Length
        this.mass     = mas; //Pendulum Mass
        this.angle    = ang; //Angle (in radians)
        this.velocity = vel; //Velocity
    }

    clone() {
        return new Pendulum(this.length, this.mass, this.angle, this.velocity);
    }
}
