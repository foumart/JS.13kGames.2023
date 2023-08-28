class PathTile extends Tile {
	
	constructor(boardWidth, boardHeight, x, y, type) {
		super(boardWidth, boardHeight, x, y, type);
	}

	resize() {
		super.resize();
		this.draw();
	}

	draw() {
		if (this.type > -1) {
			this.context.fillStyle = this.getColor();
			this.context.strokeStyle = "#fff";
			this.context.lineWidth = 5;
			this.context.strokeRect(this.getX() + this.size/4, this.getY() + this.size/4, this.size/2, this.size/2);
		}
	}
}