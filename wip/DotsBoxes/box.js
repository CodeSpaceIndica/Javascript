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

		//Flags denoting if the corners are highlighted, like 
		//is the mouse on top of them.
		this.hTop    = false;
		this.hRight  = false;
		this.hBottom = false;
		this.hLeft   = false;

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
	checkMouseMovement(x, y) {
		if( this.complete ) {
			return;
		}
		//Check top
		let cX = ((this.x) + (this.x+this.w)) / 2;
		let cY = ((this.y) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 ) {
			this.hTop = true;
		}
		else {
			this.hTop = false;
		}

		//Check right
		cX = ((this.x+this.w) + (this.x+this.w)) / 2;
		cY = ((this.y) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 ) {
			this.hRight = true;
		}
		else {
			this.hRight = false;
		}

		//Check bottom
		cX = ((this.x+this.w) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 ) {
			this.hBottom = true;
		}
		else {
			this.hBottom = false;
		}

		//Check left
		cX = ((this.x) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 ) {
			this.hLeft = true;
		}
		else {
			this.hLeft = false;
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
	 * @param {*} who 
	 */
	checkClick(x, y, who) {
		if( this.complete ) {
			return;
		}
		//Check top
		let cX = ((this.x) + (this.x+this.w)) / 2;
		let cY = ((this.y) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.top ) {
			this.doMove(1, who);
			return true;
		}

		//Check right
		cX = ((this.x+this.w) + (this.x+this.w)) / 2;
		cY = ((this.y) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.right ) {
			this.doMove(2, who);
			return true;
		}

		//Check bottom
		cX = ((this.x+this.w) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y+this.h)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.bottom ) {
			this.doMove(3, who);
			return true;
		}

		//Check left
		cX = ((this.x) + (this.x)) / 2;
		cY = ((this.y+this.h) + (this.y)) / 2;
		if( getDistance(x, y, cX, cY) <= 20 && !this.left ) {
			this.doMove(4, who);
			return true;
		}
		return false;
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
			return;
		}
		switch(whichBorder) {
			case 1: 
				this.top = true;
				//Also do the Bottom of the box on the top
				if( this.topBox !== undefined && !this.topBox.bottom ) {
					this.topBox.bottom = true;
					this.topBox.checkIfComplete(who);
				}
				break;
			case 2: 
				this.right = true;
				//Also do the Left of the box on the right
				if( this.rightBox !== undefined && !this.rightBox.left ) {
					this.rightBox.left = true;
					this.rightBox.checkIfComplete(who);
				}
				break;
			case 3: 
				this.bottom = true;
				//Also do the Top of the box on the bottom
				if( this.bottomBox !== undefined && !this.bottomBox.top ) {
					this.bottomBox.top = true;
					this.bottomBox.checkIfComplete(who);
				}
				break;
			case 4: 
				this.left= true;
				//Also do the Right of the box on the Left
				if( this.leftBox !== undefined && !this.leftBox.right ) {
					this.leftBox.right = true;
					this.leftBox.checkIfComplete(who);
				}
				break;
		}
		this.checkIfComplete(who);
	}

	/**
	 * Check if the current box is complete and set who
	 * completed it.
	 * 
	 * @param {*} who 
	 */
	checkIfComplete(who) {
		if( this.top && this.right && this.bottom && this.left ) {
			this.complete = true;
			this.completedBy = who;
		}
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
			if( this.hTop ) {
				ctx.strokeStyle = "#9999FF";
			}
			else {
				ctx.strokeStyle = "#E1E1E1";
			}
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
			if( this.hRight ) {
				ctx.strokeStyle = "#9999FF";
			}
			else {
				ctx.strokeStyle = "#E1E1E1";
			}
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
			if( this.hBottom ) {
				ctx.strokeStyle = "#9999FF";
			}
			else {
				ctx.strokeStyle = "#E1E1E1";
			}
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
			if( this.hLeft ) {
				ctx.strokeStyle = "#9999FF";
			}
			else {
				ctx.strokeStyle = "#E1E1E1";
			}
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

}