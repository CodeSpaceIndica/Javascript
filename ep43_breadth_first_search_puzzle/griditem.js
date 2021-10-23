class GridItem {
    /**
     * A constructor that takes in an ID, position and size.
     * 
     * @param {*} ID 
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     */
    constructor(ID, x, y, w, h) {
        this.ID = ID;

        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;

        //These flags signify if the direction if BLOCKED.
        this.edges = new Array();
        //Top
        let rndNum = parseInt( randomBetween(1, 100) );
        this.edges[0] = rndNum % 3 == 0;
        //Right
        rndNum = parseInt( randomBetween(1, 100) );
        this.edges[1] = rndNum % 3 == 0;
        //Bottom
        rndNum = parseInt( randomBetween(1, 100) );
        this.edges[2] = rndNum % 17 == 0;
        //Left
        rndNum = parseInt( randomBetween(1, 100) );
        this.edges[3] = rndNum % 17 == 0;

        this.neighbours = new Array();
        this.searched = false;
        this.parent = null;
        this.highlight = false;
    }

    render(ctx) {
        //Top
        if( this.edges[0] ) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x+this.w, this.y);
            ctx.stroke();
        }
        //Right
        if( this.edges[1] ) {
            ctx.beginPath();
            ctx.moveTo(this.x+this.w, this.y);
            ctx.lineTo(this.x+this.w, this.y+this.h);
            ctx.stroke();
        }
        //Bottom
        if( this.edges[2] ) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y+this.h);
            ctx.lineTo(this.x+this.w, this.y+this.h);
            ctx.stroke();
        }
        //Left
        if( this.edges[3] ) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y+this.h);
            ctx.stroke();
        }

        if( this.highlight ) {
            ctx.fillStyle = "#CCCC00";
            ctx.beginPath();
            ctx.rect(this.x+1, this.y+1, this.w-1, this.h-1);
            ctx.fill();
        }
    }

    hasTop() {
        return !this.edges[0];
    }
    hasRight() {
        return !this.edges[1];
    }
    hasBottom() {
        return !this.edges[2];
    }
    hasLeft() {
        return !this.edges[3];
    }

    /**
     * Attach the neighbour to THIS grid item
     * and also attach THIS to the neighbours.
     * 
     * @param {*} anotherGridItem 
     */
    addNeighbour(anotherGridItem) {
        let alreadyAdded = false;
        this.neighbours.forEach(neighbour => {
            if( neighbour.ID == anotherGridItem.ID ) {
                alreadyAdded = true;
            }
        });
        if( !alreadyAdded ) {
            this.neighbours.push(anotherGridItem);
            anotherGridItem.neighbours.push(this);
        }
    }
}