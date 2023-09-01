class Tile extends GameElement {
	
	constructor(x, y, type) {
		super();
		
		this.x = x;
		this.y = y;
		this.type = type;
	}

	getOffsetX() {
		let offset = 0;
		if (this.scale != 1) {
			offset = (this.canvas.width - this.canvas.width * this.scale) / 2;
		}
		return offset;
	}
	
	getOffsetY() {
		let offset = 0;
		if (this.scale != 1) {
			offset = (this.canvas.height - this.canvas.height * this.scale) / 2;
		}
		return offset;
	}

	getX() {
		return this.getOffsetX() + (this.x + this.tileOffsetX) * this.width * this.scale;
	}

	getY() {
		return this.getOffsetY() + (this.y + this.tileOffsetY) * this.height * this.scale;
	}

	draw() {
		this.context.fillStyle = this.getColor();
		this.context.fillRect(this.getX(), this.getY(), this.width * this.scale, this.height * this.scale);
	}

	getColor() {
		return "#"+["ee8", "efe", !state ? "0078d7" : "28f", "ee8"][this.type];
	}

}
