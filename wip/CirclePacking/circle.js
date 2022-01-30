
class Circle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.setRandomPosition();

        this.r = 0.1;

        this.isGrowing = true;
    }

    /**
     * Set a random position that doesn't put 
     * the circle inside another circle.
     */
    // setRandomPosition() {
    //     //Try a thousand times
    //     for(let ctr=0; ctr<1000; ctr++) {
    //         let newX = randomBetween(0, width);
    //         let newY = randomBetween(0, height);
    //         let valid = true;
    //         for(let i=0; i<circles.length; i++) {
    //             let distNS = getDistanceNoSqrt(circles[i].x, circles[i].y, newX, newY);
    //             if( distNS < (circles[i].r*circles[i].r) ) {
    //                 valid = false;
    //                 break;
    //             }
    //         }
    //         if( valid ) {
    //             this.x = newX;
    //             this.y = newY;
    //             return;
    //         }
    //     }
    // }

    setRandomPosition() {
        //Try a thousand times
        for(let ctr=0; ctr<1000; ctr++) {
            let rIndex = parseInt( randomBetween(0, availablePositions.length) );
            let newPoint = availablePositions[rIndex];
            let newX = newPoint.x
            let newY = newPoint.y;
            let valid = true;
            for(let i=0; i<circles.length; i++) {
                let distNS = getDistanceNoSqrt(circles[i].x, circles[i].y, newX, newY);
                if( distNS < (circles[i].r*circles[i].r) ) {
                    valid = false;
                    break;
                }
            }
            if( valid ) {
                this.x = newX;
                this.y = newY;
                return;
            }
        }
    }

    grow() {
        if( this.isGrowing ) {
            this.r += 1;
        }
    }

    isWithinEdges() {
        return (this.x+this.r < width && this.x-this.r > 0 && this.y+this.r < height && this.y-this.r > 0 );
    }

    collideWithOtherCircles() {
        for(let i=0; i<circles.length; i++) {
            if( circles[i] != this ) {
                let distNS = getDistanceNoSqrt(circles[i].x, circles[i].y, this.x, this.y);
                if( distNS <= ((circles[i].r+this.r+2)*(circles[i].r+this.r+2)) ) {
                    return true;
                }
            }
        }
        return false;
    }

    isTooBig() {
        if( this.r > 6 ) {
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Constants.TWO_PI, false);
        ctx.fill();
    }
}