/**
 * A 3d Point, AKA Vertex AKA Node.
 */
class ThreeDPoint {
    constructor(inputX, inputY, inputZ) {
        this.x = inputX;
        this.y = inputY;
        this.z = inputZ;

        this.projected = 0;
    }

    rotateX(radians) {
        let sinVal = Math.sin(radians);
        let cosVal = Math.cos(radians);

        let temp = (this.x * cosVal) - (this.z * sinVal);
        this.z = (this.x * sinVal) + (this.z * cosVal);
        this.x = temp;
    }

    rotateY(radians) {
        let sinVal = Math.sin(radians);
        let cosVal = Math.cos(radians);

        let temp = (this.y * cosVal) - (this.z * sinVal);
        this.z = (this.y * sinVal) + (this.z * cosVal);
        this.y = temp;
    }

    draw(ctx) {
        this.projected = DEPTH / (DEPTH + this.z);

        let xProj = this.x * this.projected;
        let yProj = this.y * this.projected;

        ctx.beginPath();
        ctx.arc(xProj, yProj, 5, 0, Constants.TWO_PI, true);
        ctx.fill();
    }
}
