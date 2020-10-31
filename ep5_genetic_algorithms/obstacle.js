class Obstacle {
    constructor() {
        this.position = new Point(
            randomBetween(300, 400),
            height-8
        );
    }

    render(ctx) {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, 6, 8);
        ctx.fill();
    }
}