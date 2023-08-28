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
		this.context.strokeStyle = "#666";
		this.context.lineWidth = 5;
		this.context.strokeRect(this.getX(), this.getY(), this.size, this.size);
	}

	stroke() {
		this.context.strokeStyle = "#0c0";
		this.context.lineWidth = 10;
		this.context.strokeRect(this.getX(), this.getY(), this.size, this.size);
		this.context.strokeStyle = "#6f6";
		this.context.lineWidth = 5;
		this.context.strokeRect(this.getX(), this.getY(), this.size, this.size);
	}

	getColor() {
		return "#"+["8e9", "efe", "28f", "888"][this.type];
	}

}