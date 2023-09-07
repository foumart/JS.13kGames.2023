class Tile extends GameElement {
	
	constructor(x, y, type) {
		super();
		
		this.x = x;
		this.y = y;
		this.type = type;
	}

	getOffsetX() {
		let offset = 0;
		/*if (this.scale != 1) {
			offset = (this.canvas.width - this.canvas.width * this.scale) / 2;
		}*/
		return offset;
	}
	
	getOffsetY() {
		let offset = 0;
		/*if (this.scale != 1) {
			offset = (this.canvas.height - this.canvas.height * this.scale);
		}*/
		offset = this.canvas.height / 15
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

		if (this.type > 1 && this.type < 4) return;
		this.context.drawImage(
			!this.type
				? PixelArt.spritesTiles[this.frame]
				: this.type == 1
					? PixelArt.spritesAhu[0]
					: PixelArt.spritesWater[this.type % 4][(this.type / 4 | 0) * 3 + this.frame]
			,
			this.getX(),
			this.getY(),
			this.width * this.scale,
			this.height * this.scale
		);
		//this.context.imageSmoothingEnabled = false;
	}

	getColor() {
		return this.type < 3 ? "#ee8" : "#0078d7";
	}

}
