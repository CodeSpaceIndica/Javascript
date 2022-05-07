
/**
 * A 3d Point, AKA Vertex AKA Node.
 */
class ThreeDPoint {
    constructor(inputX, inputY, inputZ, inputR, inputG, inputB) {
        this.x = inputX;
        this.y = inputY;
        this.z = inputZ;

        this.projected = 0;

        this.color = "rgb(" + inputR + "," + inputG + "," + inputB + ")";
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

        let radius = map(this.z, 0, DEPTH/2, MAX_RADIUS, 0);
        radius = constrain(radius, 1, MAX_RADIUS);

        let gradient = ctx.createRadialGradient(xProj-(radius/2-2), yProj-(radius/2-2), radius/4, xProj, yProj, radius);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.9, this.color);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(xProj, yProj, radius, 0, Constants.TWO_PI, true);
        ctx.fill();
    }
}
