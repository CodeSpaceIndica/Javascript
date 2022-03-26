
/**
 * A parent class to all the sort algorithms
 */
class SortPrime {
    constructor() {
        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        this.startTime = 0;
        this.timeElapsed = 0;

        this.isDone = true;
    }

    initSort() {
    }

    name() {
        return "";
    }

    doSort() {
    }

    getMaximum(anArray) {
        let max = anArray[0];
        for (let i=1; i<anArray.length; i++) {
            if (anArray[i] > max) {
                max = anArray[i];
            }
        }
        return max;
    }

    getMinimum(anArray) {
        let min = anArray[0];
        for (let i=1; i<anArray.length; i++) {
            if (anArray[i] < min) {
                min = anArray[i];
            }
        }
        return min;
    }
}