class Unit extends Tile {

	constructor(x, y, type) {
		super(x, y, type);

		this.offsetX = 0;
		this.offsetY = 0;
		this.W = 16;
		this.H = 16;
		this.S = 16;

		switch (type) {
			case 1: // palm (level data == 1)
				this.S = 14;
				this.offsetX = -0.075;
				this.offsetY = -0.55;
				break;
			case 2: // tree (level data == 2)
				//this.offsetX = 2;
				this.offsetY = -0.4;
				break;
			case 3: // rock (level data == 3)
				this.offsetX = -0.075;
				this.offsetY = -0.4;
				this.S = 14;
				break;
			case 4: // obstackle lake ? (level map == 3)
				//this.offsetY = 0.5;
				break;
			case 5: // moai
				this.H = 20;
				this.W = 14;
				this.offsetX = 0.07;
				this.offsetY = -1;
				if (!state && (x > 9 || y > 4)) this.frame = 1;
				if (!state && (x < 3 && y > 4)) this.frame = 2;
				break;
			case 6: // player
				this.H = 20;
				this.offsetY = -0.5;
				this.animated = true;
				this.animate();
				break;
			default:
			case 7: // ahu
				this.offsetY = -0.2;
				break;
		}
	}

	animate() {
		if (this.animated) {
			clearTimeout(this.timeout);
			const blink = Math.random() < .2;
			this.timeout = setTimeout(() => {
				if (Math.random() < .6) this.frame = Game.instance.step % 9 == 0 ? 1 : -1;
				this.frame ++;
				if (this.frame > 2) this.frame = 0;
				this.animate();
			}, blink ? 120 : 600 + Math.random() * 600);
		}
	}

	resize() {
		super.resize();
		this.width = this.elementSize * this.scale;
		this.height = this.elementSize * this.scale;
		this.draw();
	}

	draw() {
		this.context.drawImage(
			this.type == 7
				? PixelArt.spritesObjects[4]
				: this.type < 4
					? PixelArt.spritesObjects[this.type - 1]
					: this.type == 5
						? PixelArt.spritesMoai[this.frame]
						: this.type == 4
							? PixelArt.spritesObjects[3]
							: PixelArt.spritesCharacter[this.frame],
			this.getOffsetX() + (this.offsetX + this.x) * this.elementSize * this.scale,
			this.getOffsetY() + (this.offsetY + (this.y -1) + this.tilt) * this.elementSize * this.scale * this.tilt,
			this.width / this.S * this.W,
			this.height / this.S * this.H
		);
	}
}
