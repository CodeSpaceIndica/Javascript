/**
 * A Block class
 */
class Block {
    constructor(xx, yy, isBlckd, isSrc, isDst) {
        this.x = xx;
        this.y = yy;

        this.isBlocked = isBlckd;
        this.isSource = isSrc;
        this.isDestination = isDst;
        this.isPath = false;

        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;
    }

    sameAs(anotherBlock) {
        if( this.x == anotherBlock.x && this.y == anotherBlock.y ) {
            return true;
        }
        return false;
    }

    render(aCtx) {
        aCtx.strokeStyle = "#A2A2A2";
        if( this.isSource ) {
            aCtx.fillStyle = "#FF0000";
            aCtx.beginPath();
            aCtx.rect(this.x, this.y, blockSize, blockSize);
            aCtx.fill();
            aCtx.stroke();
        }
        else if( this.isDestination ) {
            aCtx.fillStyle = "#00FF00";
            aCtx.beginPath();
            aCtx.rect(this.x, this.y, blockSize, blockSize);
            aCtx.fill();
            aCtx.stroke();
        }
        else if( this.isBlocked ) {
            aCtx.fillStyle = "#999999";
            aCtx.beginPath();
            aCtx.rect(this.x, this.y, blockSize, blockSize);
            aCtx.fill();
            aCtx.stroke();
        }
        else if( this.isPath ) {
            aCtx.fillStyle = "#666699";
            aCtx.beginPath();
            aCtx.rect(this.x, this.y, blockSize, blockSize);
            aCtx.fill();
            aCtx.stroke();
        }
        else {
            aCtx.fillStyle = "#FFFFFF";
            aCtx.beginPath();
            aCtx.rect(this.x, this.y, blockSize, blockSize);
            aCtx.fill();
            aCtx.stroke();
        }
    }

}
