
/**
 * A 3d Point, AKA Vertex AKA Node.
 */
class ThreeDPoint {
    constructor(inputX, inputY, inputZ, inputR, inputG, inputB) {
        this.x = inputX;
        this.y = inputY;
        this.z = inputZ;

        this.projected = 0;

        this.r = inputR;
        this.g = inputG;
        this.b = inputB;
    }

    rotateX(radians) {
        var sinVal = Math.sin(radians);
        var cosVal = Math.cos(radians);

        var temp = (this.x * cosVal) - (this.z * sinVal);
        this.z = (this.x * sinVal) + (this.z * cosVal);
        this.x = temp;
    }

    rotateY(radians) {
        var sinVal = Math.sin(radians);
        var cosVal = Math.cos(radians);

        var temp = (this.y * cosVal) - (this.z * sinVal);
        this.z = (this.y * sinVal) + (this.z * cosVal);
        this.y = temp;
    }

    draw(ctx) {
        this.projected = DEPTH / (DEPTH + this.z);

        let xProj = this.x * this.projected;
        let yProj = this.y * this.projected;

        let radius = map(this.z, 0, DEPTH, MAX_RADIUS, 0);
        radius = constrain(radius, 1, MAX_RADIUS);

        let darkenFactor = map(this.z, 0, 150, 1, 0.3);
        let red = this.r * darkenFactor;
        let grn = this.g * darkenFactor;
        let blu = this.b * darkenFactor;

        ctx.fillStyle = "rgb(" + red + "," + grn + "," + blu + ")";
        ctx.beginPath();
        ctx.arc(xProj, yProj, radius, 0, Constants.TWO_PI, true);
        ctx.fill();
    }
}
