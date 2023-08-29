class Tile extends Element {
	
	constructor(boardWidth, boardHeight, x, y, type) {
		super(boardWidth, boardHeight);
		
		this.x = x;
		this.y = y;
		this.type = type;
	}

	getX() {
		return this.x * this.size;
	}

	getY() {
		return this.y * this.size;
	}

	draw() {
		this.context.fillStyle = this.getColor();
		this.context.fillRect(this.getX(), this.getY(), this.size, this.size);
	}

	getColor() {
		return "#"+["ee8", "efe", "28f", "ee8"][this.type];
	}

}