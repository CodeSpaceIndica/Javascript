
class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Constants.TWO_PI, false);
        ctx.fill();
    }
}
