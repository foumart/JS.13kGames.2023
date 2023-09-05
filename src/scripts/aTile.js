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
		return this.getOffsetX() + this.x * this.width * this.scale;
	}

	getY() {
		return this.getOffsetY() + this.y * this.height * this.scale;
	}

	draw() {
		//this.context.beginPath();
		this.context.fillStyle = this.getColor();
		this.context.fillRect(this.getX(), this.getY(), this.width * this.scale, this.height * this.scale);
		//this.context.closePath();
		//this.context.imageSmoothingEnabled = true;
		if (!this.type) {
			this.context.drawImage(
				PixelArt.spritesTiles[this.frame],
				this.getX(),
				this.getY(),
				this.width * this.scale,
				this.height * this.scale
			);
		}

		if (this.type == 1) {
			this.context.drawImage(
				PixelArt.spritesAhu[0],
				this.getX(),
				this.getY(),
				this.width * this.scale,
				this.height * this.scale
			);
		}
		//this.context.imageSmoothingEnabled = false;
	}

	getColor() {
		return "#"+["ee8", "ee8", !state ? "0078d7" : "28f", "ee8"][this.type];
	}

}
