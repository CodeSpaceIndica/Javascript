/**
 * A box class that reprents a single box.
 * A box has 4 borders top, right, bottom, left. 
 * A box also can have 4 neighbours top, right, bottom and left.
 * 
 * When a border of a box is clicked, it must also set the border of the 
 * neighbouring boxes.
 */
class Box {
	/**
	 * A constructor that stores the location of this box(essentially a rectangle)
	 * It also initializes the top, right, bottom and left flags and neighbours.
	 * 
	 * @param {*} x 
	 * @param {*} y 
	 * @param {*} w 
	 * @param {*} h 
	 */
	constructor(x, y, w, h) {
		//Location and size. Not using point class 
		//for simplicity
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		//Flags denoting the top, right, bottom and left corners
		//are selected or on.
		this.top    = false;
		this.right  = false;
		this.bottom = false;
		this.left   = false;

		//A flag to determine if the box is complete
		//meaning all 4 corners are ON and WHO completed it
		this.complete = false;
		this.completedBy = "";

		//Neighbours of the current box.
		this.topBox = undefined;
		this.rightBox = undefined;
		this.bottomBox = undefined;
		this.leftBox = undefined;
	}

	/**
	 * A function set the neighbours of this box.
	 * @param {*} t 
	 * @param {*} r 
	 * @param {*} b 
	 * @param {*} l 
	 */
	setNeighbours(t, r, b, l) {
		this.topBox = t;
		this.rightBox = r;
		this.bottomBox = b;
		this.leftBox = l;
	}

	/**
	 * Check if the mouse is hovering over a box corner.
	 * The corner will be highlighted if the parameter X and Y
	 * are close to the corner's center within 20 pixels
	 * @param {*} x 
	 * @param {*} y 
	 */
	checkMouseMovement(x, y, ctx) {
		if( this.complete ) {
			return;
		}
		//Check top
		let cX = ((this.x) + (this.x+this.w)) / 2;
		let cY = ((this.y) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.top ) {
			ctx.strokeStyle = "#9999FF";
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(this.x+this.w, this.y);
			ctx.stroke();	
		}

		//Check right
		cX = ((this.x+this.w) + (this.x+this.w)) / 2;
		cY = ((this.y) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.right ) {
			//Right Line
			ctx.strokeStyle = "#9999FF";
			ctx.beginPath();
			ctx.moveTo(this.x+this.w, this.y);
			ctx.lineTo(this.x+this.w, this.y+this.h);
			ctx.stroke();
		}

		//Check bottom
		cX = ((this.x+this.w) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.bottom ) {
			ctx.strokeStyle = "#9999FF";
			ctx.beginPath();
			ctx.moveTo(this.x+this.w, this.y+this.h);
			ctx.lineTo(this.x, this.y+this.h);
			ctx.stroke();
		}

		//Check left
		cX = ((this.x) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.left ) {
			ctx.strokeStyle = "#9999FF";
			ctx.beginPath();
			ctx.moveTo(this.x, this.y+this.h);
			ctx.lineTo(this.x, this.y);
			ctx.stroke();
		}
	}

	/**
	 * Check if the mouse has been clicked and determine which corner 
	 * has been clicked.
	 * When a border of a box is clicked, it must also set the border of the 
	 * neighbouring boxes.
	 * 
	 * @param {*} x 
	 * @param {*} y 
	 */
	checkClick(x, y) {
		if( this.complete ) {
			return 0;
		}
		//Check top
		let cX = ((this.x) + (this.x+this.w)) / 2;
		let cY = ((this.y) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.top ) {
			return 1;
		}

		//Check right
		cX = ((this.x+this.w) + (this.x+this.w)) / 2;
		cY = ((this.y) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.right ) {
			return 2;
		}

		//Check bottom
		cX = ((this.x+this.w) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.bottom ) {
			return 3;
		}

		//Check left
		cX = ((this.x) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.left ) {
			return 4;
		}
		return 0;
	}

	/**
	 * Actual highlighting of the border occurs here
	 * If the box is complete, also set WHO completed it.
	 * 
	 * @param {*} whichBorder 
	 * @param {*} who 
	 */
	doMove(whichBorder, who) {
		if( this.complete ) {
			return false;
		}
		let wasCompletedNow = false;
		switch(whichBorder) {
			case 1: 
				this.top = true;
				//Also do the Bottom of the box on the top
				if( this.topBox !== undefined && !this.topBox.bottom ) {
					this.topBox.bottom = true;
					wasCompletedNow = wasCompletedNow || this.topBox.checkIfComplete(who);
				}
				break;
			case 2: 
				this.right = true;
				//Also do the Left of the box on the right
				if( this.rightBox !== undefined && !this.rightBox.left ) {
					this.rightBox.left = true;
					wasCompletedNow = wasCompletedNow || this.rightBox.checkIfComplete(who);
				}
				break;
			case 3: 
				this.bottom = true;
				//Also do the Top of the box on the bottom
				if( this.bottomBox !== undefined && !this.bottomBox.top ) {
					this.bottomBox.top = true;
					wasCompletedNow = wasCompletedNow || this.bottomBox.checkIfComplete(who);
				}
				break;
			case 4: 
				this.left= true;
				//Also do the Right of the box on the Left
				if( this.leftBox !== undefined && !this.leftBox.right ) {
					this.leftBox.right = true;
					wasCompletedNow = wasCompletedNow || this.leftBox.checkIfComplete(who);
				}
				break;
		}
		//Do you know why this.checkIfComplete(who) is evaulated first?
		//answr in the comments
		return this.checkIfComplete(who) || wasCompletedNow;
	}

	/**
	 * Undoes a move
	 * 
	 * @param {*} whichBorder 
	 */
	undoMove(whichBorder) {
		this.complete = false;
		this.completedBy = "";
		switch(whichBorder) {
			case 1: 
				this.top = false;
				//Also do the Bottom of the box on the top
				if( this.topBox !== undefined ) {
					this.topBox.bottom = false;
					this.topBox.complete = false;
					this.topBox.completedBy = "";
				}
				break;
			case 2: 
				this.right = false;
				//Also do the Left of the box on the right
				if( this.rightBox !== undefined ) {
					this.rightBox.left = false;
					this.rightBox.complete = false;
					this.rightBox.completedBy = "";
				}
				break;
			case 3: 
				this.bottom = false;
				//Also do the Top of the box on the bottom
				if( this.bottomBox !== undefined ) {
					this.bottomBox.top = false;
					this.bottomBox.complete = false;
					this.bottomBox.completedBy = "";
				}
				break;
			case 4: 
				this.left = false;
				//Also do the Right of the box on the Left
				if( this.leftBox !== undefined ) {
					this.leftBox.right = false;
					this.leftBox.complete = false;
					this.leftBox.completedBy = "";
				}
				break;
		}
	}

	/**
	 * Check if the current box is complete and set who
	 * completed it.
	 * 
	 * Returns true ONLY if the box was completed with the current move
	 * 
	 * @param {*} who 
	 */
	checkIfComplete(who) {
		let wasAlreadyComlete = this.complete;
		if( this.top && this.right && this.bottom && this.left ) {
			this.complete = true;
			this.completedBy = who;
		}
		return !wasAlreadyComlete && this.complete;
	}

	/**
	 * Render the boxes. 
	 * 
	 * @param {*} ctx 
	 */
	render(ctx) {
		ctx.lineWidth = 5.5;

		//Start rendering the lines
		//Top Line
		if(this.top) {
			ctx.strokeStyle = "#CC0000";
		}
		else {
			ctx.strokeStyle = "#E1E1E1";
		}
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x+this.w, this.y);
		ctx.stroke();

		//Right Line
		if(this.right) {
			ctx.strokeStyle = "#CC0000";
		}
		else {
			ctx.strokeStyle = "#E1E1E1";
		}
		ctx.beginPath();
		ctx.moveTo(this.x+this.w, this.y);
		ctx.lineTo(this.x+this.w, this.y+this.h);
		ctx.stroke();

		//Bottom Line
		if(this.bottom) {
			ctx.strokeStyle = "#CC0000";
		}
		else {
			ctx.strokeStyle = "#E1E1E1";
		}
		ctx.beginPath();
		ctx.moveTo(this.x+this.w, this.y+this.h);
		ctx.lineTo(this.x, this.y+this.h);
		ctx.stroke();

		//Left Line
		if(this.left) {
			ctx.strokeStyle = "#CC0000";
		}
		else {
			ctx.strokeStyle = "#E1E1E1";
		}
		ctx.beginPath();
		ctx.moveTo(this.x, this.y+this.h);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();

		//The Dots
		ctx.fillStyle = "#000000";

		ctx.beginPath();
		ctx.arc(this.x, this.y, 4, 0, Math.PI*2, false);
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x+this.w, this.y, 4, 0, Math.PI*2, false);
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x+this.w, this.y+this.h, 4, 0, Math.PI*2, false);
		ctx.fill();

		ctx.beginPath();
		ctx.arc(this.x, this.y+this.h, 4, 0, Math.PI*2, false);
		ctx.fill();

		if( this.complete ) {
			ctx.fillStyle = "#FFFF99";
			ctx.beginPath();
			ctx.rect(this.x+2, this.y+2, this.w-4, this.h-4);
			ctx.fill();

			ctx.fillStyle = "#222222";
			let fMetrics = ctx.measureText(this.completedBy);
			let tWidth = fMetrics.width;
			let textX = this.x + ((this.w/2) - (tWidth/2));
			let textY = this.y + ((this.h/2) + 10);
			ctx.beginPath();
			ctx.fillText(this.completedBy, textX, textY);
			ctx.fill();
		}
	}

	reset() {
		this.top    = false;
		this.right  = false;
		this.bottom = false;
		this.left   = false;

		this.complete = false;
		this.completedBy = "";
	}

	clone() {
		let clonedBox = new Box();

		clonedBox.x = this.x;
		clonedBox.y = this.y;
		clonedBox.w = this.w;
		clonedBox.h = this.h;

		clonedBox.top    = this.top;
		clonedBox.right  = this.right;
		clonedBox.bottom = this.bottom;
		clonedBox.left   = this.left;

		clonedBox.complete = this.complete;
		clonedBox.completedBy = this.completedBy;

		clonedBox.topBox = this.topBox;
		clonedBox.rightBox = this.rightBox;
		clonedBox.bottomBox = this.bottomBox;
		clonedBox.leftBox = this.leftBox;

		return clonedBox;
	}
}