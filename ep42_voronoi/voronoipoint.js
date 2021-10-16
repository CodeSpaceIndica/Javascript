
/**
 * A Voronoi Point having its own colour
 */
class VoronoiPoint {
    constructor(aPoint) {
        this.point = aPoint;

        var r = Math.floor( randomBetween(50, 255) );
        var g = Math.floor( randomBetween(50, 255) );
        var b = Math.floor( randomBetween(50, 255) );

        this.clr = "rgb(" + r + "," + g + "," + b + ")";
    }
}