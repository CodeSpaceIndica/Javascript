
class FoodPheromone {
    constructor(aPos) {
        this.strength = 1;
        this.pos = aPos.clone();
    }

    step() {
        this.strength = (1 - DECAY_CONSTANT) * this.strength;

        //if( this.strength < 0.2 ) {
        //    stepPheromones.splice( stepPheromones.indexOf(this), 1);
        //}
    }

    render(aCtx) {
        aCtx.fillStyle = "rgba(255,0,0," + this.strength + ")";

        aCtx.beginPath();
        aCtx.arc(this.pos.x, this.pos.y, 3, 0, Constants.TWO_PI, false);
        //aCtx.rect(this.pos.x, this.pos.y, 5, 5);
        aCtx.fill();
    }
}