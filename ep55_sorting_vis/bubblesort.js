
class BubbleSort extends SortPrime {
    constructor() {
        super();

        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        this.startTime = 0;
        this.timeElapsed = 0;

        this.isDone = true;
    }

    initSort() {
        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        let dt = new Date();
        this.startTime = dt.getTime();
        this.timeElapsed = 0;

        this.isDone = false;
    }

    name() {
        return "Bubble Sort";
    }

    doSort() {
        this.loopCount++;

        //BUBBLE SORT
        for (let j=0; j<valuesArray.length-this.index; j++) {
            this.loopCount++;
            if (valuesArray[j] > valuesArray[j+1]) {
                this.swapCount++;
                let tmp = valuesArray[j];
                valuesArray[j] = valuesArray[j+1];
                valuesArray[j+1] = tmp;
            }
        }
        this.index++;
        if( this.index > valuesArray.length-1 ) {
            let dt = new Date();
            this.timeElapsed = dt.getTime() - this.startTime;

            this.isDone = true;

            return;
        }

        if( !isMuted ) {
            let frequency = (valuesArray[this.index] * 10) + 500;
            playNote(frequency, 10);
        }

        let dt = new Date();
        this.timeElapsed = dt.getTime() - this.startTime;

        setTimeout(this.doSort.bind(this), timeDelay);
    }
}
