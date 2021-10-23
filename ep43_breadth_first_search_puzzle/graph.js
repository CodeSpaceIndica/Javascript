class Graph {
    constructor() {
        this.items = new Array();
    }

    addItem(aGridItem) {
        this.items.push(aGridItem);
    }

    doBreadthFirstSearch(startID, endID) {
        let start = null;
        let end = null;
        for(let i=0; i<this.items.length; i++) {
            let gItem = this.items[i];
            if(gItem.ID == startID) {
                start = gItem;
            }
            if( gItem.ID == endID) {
                end = gItem;
            }
            if( start != null && end != null ) {
                break;
            }
        }

        let queue = [];

        start.searched = true;
        queue.push(start);

        while(queue.length > 0) {
            let current = queue.shift();
            if( current == end) {
                break;
            }

            var cNeighbours = current.neighbours;
            cNeighbours.forEach(neighbour => {
                if( !neighbour.searched ) {
                    neighbour.searched = true;
                    neighbour.parent = current;
                    queue.push(neighbour);
                }
            });
        }

        let path = [];
        path.push(end);
        let next = end.parent;
        while( next != null) {
            path.push(next);
            next = next.parent;
        }

        return path;
    }
}