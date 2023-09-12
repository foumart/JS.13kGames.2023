class Unit extends Tile {

	constructor(x, y, type) {
		super(x, y, type);

		this.baseX = this.offsetX = 0;
		this.baseY = this.offsetY = 0;
		this.W = 16;
		this.H = 16;
		this.S = 16;

		switch (type) {
			case 1: // palm (level data == 1)
				this.S = 14;
				this.baseX = this.offsetX = -0.075;
				this.baseY = this.offsetY = -0.55;
				break;
			case 2: // tree (level data == 2)
				this.baseX = this.offsetX = -0.1;
				this.baseY = this.offsetY = -0.5;
				break;
			case 3: // rock (level data == 3)
				this.baseX = this.offsetX = -0.075;
				this.baseY = this.offsetY = -0.4;
				this.S = 14;
				break;
			case 5: // moai
				this.convertToMoai();
				if (!state && (x > 10 || y > 6)) this.frame = 1;
				if (!state && (x < 3 && y > 6)) this.frame = 3;
				break;
			case 6: // player
				this.H = 20;
				this.baseY = this.offsetY = -0.5;
				this.animated = true;
				this.animate();
				break;
			default: // lake (4)
				break;
		}
	}

	// Changes a Rock (Mountain) into Moai statue
	convertToMoai() {
		this.highlighted = false;
		this.type = 5;
		this.H = 20;
		this.W = 14;
		this.S = 14;
		this.baseX = this.offsetX = 0;
		this.baseY = this.offsetY = this.y < 2 || !state ? -1.3 : -0.7;
	}

	// Called when a Moai is being moved - depends on prevMove
	move(speed = 8, alter = -1) {
		if (prevMove == 1) {
			this.moveTo(0, -1, speed, alter);
		} else if (prevMove == 2) {
			this.moveTo(1, 0, speed, alter);
		} else if (prevMove == 3) {
			this.moveTo(0, 1, speed, alter);
		} else if (prevMove == 4) {
			this.moveTo(-1, 0, speed, alter);
		}
	}

	// Moves the unit in an adjacent tile
	moveTo(x, y, speed = 8, alter = -1) {
		if (hilight) {
			SoundFX.p(1, 99, -9, 9);// remove hilight sound
		} else {
			SoundFX.p(1, 60, -2, 5);// move step sound
			SoundFX.p(1, 50, -1, 5, 80);
		}

		if (alter > -1) {
			board.unitsData[this.y][this.x] = 0;
			board.unitsData[this.y + y][this.x + x] = alter;
		}

		this.x += x;
		this.y += y;
		if (x) this.offsetX = this.baseX - x;
		if (y) this.offsetY = this.baseY - y;
		TweenFX.to(this, speed, {offsetY: this.type == 5 && this.y < 2 ? -1.2 : this.baseY, offsetX: this.baseX});
	}

	// Infinite looping function for character idle animation
	animate() {
		if (this.animated) {
			clearTimeout(this.timeout);
			const blink = Math.random() < .2;
			this.timeout = setTimeout(() => {
				if (Math.random() < .6) this.frame = Game.instance.step % 9 == 0 ? 1 : -1;
				this.frame ++;
				if (this.frame > 2) this.frame = 0;
				this.animate();
			}, blink ? 200 : 600 + Math.random() * 600);
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
				? PixelArt.spritesObjects[3]
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

		if (this.highlighted || this.attached) {// TODO: make a proper selection
			this.context.beginPath(); 
			this.context.strokeStyle = this.attached ? '#0f0' : '#fff';
			this.context.lineWidth = width/99;
			this.context.strokeRect(
				this.getOffsetX() + (this.offsetX + this.x) * this.elementSize * this.scale,
				this.getOffsetY() + (this.offsetY + (this.y -1) + this.tilt) * this.elementSize * this.scale * this.tilt,
				this.width / this.S * this.W,
				this.height / this.S * this.H
			);
		}
	}
}
