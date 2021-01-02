
class Vehicle {

    constructor(size, discipline, dir, sX, sY, speed, clr) {
        this.length = size;
        this.thickness = this.length/2;
        this.discipline = discipline;
        this.direction = dir;

        this.x = sX;
        this.y = sY;

        this.iX = speed;
        this.origSpeed = speed;

        this.clr = clr;
    }

    update() {
        this.x += this.iX;
    }

    render(ctx) {
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.length, this.thickness);
        ctx.fill();

        ctx.beginPath();
        if( this.direction == Constants.DIR_RIGHT ) {
            ctx.arc(this.x, this.y+(this.thickness/2), this.thickness/2, 0, Constants.TWO_PI, true);
        }
        else {
            ctx.arc(this.x+this.length, this.y+(this.thickness/2), this.thickness/2, 0, Constants.TWO_PI, true);
        }
        ctx.fill();
    }
}