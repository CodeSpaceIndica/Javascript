
class Food {
    constructor() {
        //this.quantity = randomBetween(FOOD_MAX_QUANTITY/2, FOOD_MAX_QUANTITY);
        this.quantity = FOOD_MAX_QUANTITY;
        this.foodArea = this.quantity*this.quantity;

        this.pos = new Point(randomBetween(20, width-20), randomBetween(20, height-20));
    }

    takeBite(anAnt) {
        anAnt.foodBite = FOOD_BITE_SIZE;
        this.quantity -= FOOD_BITE_SIZE;
        if( this.quantity < 0 ) {
            this.quantity = 0;
        }
    }

    step() {
        this.foodArea = this.quantity*this.quantity;
    }

    render(aCtx) {
        aCtx.fillStyle = "#00FF00";

        aCtx.beginPath();
        aCtx.arc(this.pos.x, this.pos.y, this.quantity, 0, Constants.TWO_PI, false);
        aCtx.fill();
    }
}
