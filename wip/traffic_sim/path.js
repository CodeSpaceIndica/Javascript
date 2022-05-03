
class Path {
    constructor() {
        this.pathPoints = new Array();
    }

    addPoint(aPoint) {
        this.pathPoints.push(aPoint);
    }

    render(ctx) {
        ctx.strokeStyle = "#E0E0E0";
        ctx.beginPath();
        ctx.moveTo( this.pathPoints[0].x, this.pathPoints[0].y);
        for(let i=1; i<this.pathPoints.length; i++) {
            ctx.lineTo( this.pathPoints[i].x, this.pathPoints[i].y );
        }
        ctx.stroke();
    }
}