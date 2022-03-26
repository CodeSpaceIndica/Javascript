
class BucketSort extends SortPrime {
    constructor() {
        super();
        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        this.startTime = 0;
        this.timeElapsed = 0;

        this.isDone = true;

        this.allBuckets = [];
        this.bucketSize = 10;
        this.resultsArray = [];
    }

    initSort() {
        this.index = 0;

        this.loopCount = 0;
        this.swapCount = 0;

        let dt = new Date();
        this.startTime = dt.getTime();
        this.timeElapsed = 0;

        this.isDone = false;

        this.allBuckets = [];
        this.bucketSize = 5;
        this.resultsArray = [];
    }

    name() {
        return "Bucket Sort";
    }

    insertionSort(anArray) {
        for(let i=0; i<anArray.length; i++) {
            for(let j=i; j>0 && anArray[j-1] > anArray[j]; j--) {
                let tmp = anArray[j];
                anArray[j] = anArray[j-1];
                anArray[j-1] = tmp;

                this.loopCount++;
                this.swapCount++;
            }
        }

        return anArray;
    }

    doSort() {
        let minValue = super.getMinimum(valuesArray);
        let maxValue = super.getMaximum(valuesArray);

        let bucketCount = Math.floor((maxValue - minValue) / this.bucketSize) + 1;
        this.allBuckets = new Array(bucketCount);

        for (let i=0; i<this.allBuckets.length; i++) {
            this.allBuckets[i] = [];
            this.loopCount++;
        }

        for(let i=0; i<valuesArray.length; i++) {
            let currVal = valuesArray[i];
            let idx = Math.floor( (currVal - minValue) / this.bucketSize);
            this.allBuckets[idx].push( currVal );
            this.loopCount++;
        }

        this.sortBuckets();
    }

    sortBuckets() {
        let aBucket = this.allBuckets[this.index];
        aBucket = this.insertionSort(aBucket);

        for(let i=0; i<aBucket.length; i++) {
            this.resultsArray.push( aBucket[i] );
            this.loopCount++;
        }

        this.index++;
        if( this.index > this.allBuckets.length-1) {
            this.isDone = true;
            return;
        }
        this.loopCount++;

        if( !isMuted ) {
            let frequency = (valuesArray[this.index] * 10) + 500;
            playNote(frequency, 10);
        }
        let dt = new Date();
        this.timeElapsed = dt.getTime() - this.startTime;

        valuesArray = this.resultsArray;

        setTimeout(this.sortBuckets.bind(this), timeDelay);
    }
}
