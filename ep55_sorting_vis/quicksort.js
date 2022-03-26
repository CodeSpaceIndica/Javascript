
class QuickSort extends SortPrime {
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
        return "Quick Sort";
    }

    // method to find the partition position
    async partition(anArray, low, high) {
        this.loopCount++;

        // choose the rightmost element as pivot
        let pivot = anArray[high];

        // pointer for greater element
        let i = (low - 1);

        // traverse through all elements
        // compare each element with pivot
        for (let j = low; j < high; j++) {
            this.loopCount++;
            if (anArray[j] <= pivot) {
                // if element smaller than pivot is found
                // swap it with the greatr element pointed by i
                i++;
                // swapping element at i with element at j
                let tmp = anArray[i];
                anArray[i] = anArray[j];
                anArray[j] = tmp;
                this.swapCount++;
            }
        }

        // swap the pivot element with the greater element specified by i
        let tmp = anArray[i + 1];
        anArray[i + 1] = anArray[high];
        anArray[high] = tmp;
        this.swapCount++;

        if( !isMuted ) {
            let frequency = (pivot * 10) + 500;
            playNote(frequency, 10);
        }
        let dt = new Date();
        this.timeElapsed = dt.getTime() - this.startTime;

        await sleep(timeDelay);

        // return the position from where partition is done
        return i + 1;
    }

    //The actual quick sort function
    async quickSort(anArray, low, high, isTop) {
        if (low < high) {
            // find pivot element such that
            // elements smaller than pivot are on the left
            // elements greater than pivot are on the right
            let pi = await this.partition(anArray, low, high);

            await Promise.all([
                // recursive call on the left of pivot
                this.quickSort(anArray, low, pi - 1, false),

                // recursive call on the right of pivot
                this.quickSort(anArray, pi + 1, high, false)
            ]);
        }
        if( isTop ) {
            this.isDone = true;
        }
    }

    doSort() {
        this.quickSort(valuesArray, 0, valuesArray.length-1, true);
    }
}
