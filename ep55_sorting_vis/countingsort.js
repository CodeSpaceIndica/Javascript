
class CountingSort extends SortPrime {
    constructor() {
        super();
        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        this.startTime = 0;
        this.timeElapsed = 0;

        this.isDone = true;

        this.counters = [];
        this.resultIndex = 0;
    }

    initSort() {
        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        let dt = new Date();
        this.startTime = dt.getTime();
        this.timeElapsed = 0;

        this.isDone = false;

        this.counters = [];
        this.resultIndex = 0;
    }

    name() {
        return "Counting Sort";
    }

    doSort() {
        let max = super.getMaximum(valuesArray);

        this.counters = new Array(max+1);
        this.counters.fill(0);

        valuesArray.forEach(value => {
            this.counters[value]++;
            this.loopCount++;
        });

        this.resultIndex = 0;
        this.doCountSort();

        let dt = new Date();
        this.timeElapsed = dt.getTime() - this.startTime;
    }

    doCountSort() {
        while (this.counters[this.index] > 0) {
            valuesArray[this.resultIndex] = this.index;
            this.resultIndex++;
            this.counters[this.index]--;

            this.loopCount++;
        }
        this.loopCount++;

        this.index++;
        if( this.index > this.counters.length-1 ) {
            this.isDone = true;
            return;
        }

        if( !isMuted ) {
            let frequency = (valuesArray[this.index] * 10) + 500;
            playNote(frequency, 10);
        }

        let dt = new Date();
        this.timeElapsed = dt.getTime() - this.startTime;

        setTimeout(this.doCountSort.bind(this), timeDelay);
    }
}
