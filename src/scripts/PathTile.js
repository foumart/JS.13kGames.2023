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
			//this.context.fillStyle = this.getColor();
			//this.context.strokeStyle = "#fff";
			//this.context.lineWidth = 5;
			//this.context.strokeRect(this.getX() + this.size/4, this.getY() + this.size/4, this.size/2, this.size/2);

			this.context.fillStyle = Board.instance.pattern;
			this.context.strokeStyle = "#fff";
			this.context.lineWidth = 5;

			this.context.beginPath();

			//if (this.type == 1) {
				//this.context.fillRect(this.getX() + this.size/4, this.getY() + this.size/4, this.size/2, this.size/2);
			//}

			if (this.type == 1) {
				this.context.fillRect(this.getX() + this.size/4, this.getY(), this.size/2, this.size/2);
				this.context.arc(this.getX() + this.size/2, this.getY() + this.size/2, this.size/4, 0, Math.PI);
			} else if (this.type == 2) {
				this.context.fillRect(this.getX() + this.size/2, this.getY() + this.size/4, this.size/2, this.size/2);
				this.context.arc(this.getX() + this.size/2, this.getY() + this.size/2, this.size/4, Math.PI/2, Math.PI*1.5);
			} else if (this.type == 3) {
				this.context.fillRect(this.getX() + this.size/2, this.getY() + this.size/4, this.size/2, this.size/2);
				this.context.arc(this.getX() + this.size/2, this.getY() + this.size/2, this.size/4, Math.PI, Math.PI*2);
			} else if (this.type == 4) {
				this.context.fillRect(this.getX(), this.getY() + this.size/4, this.size/2, this.size/2);
				this.context.arc(this.getX() + this.size/2, this.getY() + this.size/2, this.size/4, -Math.PI/2, Math.PI/2);
			} else if (this.type == 5) {
				this.context.fillRect(this.getX() + this.size/4, this.getY(), this.size/2, this.size);
			} else if (this.type == 6) {
				this.context.fillRect(this.getX(), this.getY() + this.size/4, this.size, this.size/2);
			} else if (this.type == 7) {
				this.context.fillRect(this.getX() + this.size/4, this.getY(), this.size/2, this.size);
				this.context.fillRect(this.getX() + this.size/2, this.getY() + this.size/4, this.size/2, this.size/2);
			} else if (this.type == 8) {
				this.context.fillRect(this.getX(), this.getY() + this.size/4, this.size, this.size/2);
				this.context.fillRect(this.getX() + this.size/4, this.getY() + this.size/2, this.size/2, this.size/2);
			} else if (this.type == 9) {
				this.context.fillRect(this.getX() + this.size/4, this.getY(), this.size/2, this.size);
				this.context.fillRect(this.getX(), this.getY() + this.size/4, this.size/2, this.size/2);
			} else if (this.type == 10) {
				this.context.fillRect(this.getX(), this.getY() + this.size/4, this.size, this.size/2);
				this.context.fillRect(this.getX() + this.size/4, this.getY(), this.size/2, this.size/2);
			} else if (this.type == 13) {
				this.context.moveTo(this.getX() + this.size/4, this.getY());
				this.context.lineTo(this.getX() + this.size/4, this.getY() + this.size/4);
				this.context.lineTo(this.getX(), this.getY() + this.size/4);
				this.context.lineTo(this.getX(), this.getY() + this.size - this.size/4);
				this.context.lineTo(this.getX() + this.size/4, this.getY() + this.size - this.size/4);
				this.context.arcTo(this.getX() + this.size - this.size/4, this.getY() + this.size - this.size/4, this.getX() + this.size - this.size/4, this.getY() + this.size - this.size/2, this.size/2);
				this.context.lineTo(this.getX() + this.size - this.size/4, this.getY() + this.size/4);
				this.context.lineTo(this.getX() + this.size - this.size/4, this.getY());
			} else {
				this.context.moveTo(this.getX() + this.size/4, this.getY());
				this.context.lineTo(this.getX() + this.size/4, this.getY() + this.size/4);
				this.context.arcTo(this.getX() + this.size/4, this.getY() + this.size - this.size/4, this.getX() + this.size - this.size/4, this.getY() + this.size - this.size/4, this.size/2);
				this.context.lineTo(this.getX() + this.size, this.getY() + this.size - this.size/4);
				this.context.lineTo(this.getX() + this.size, this.getY() + this.size/4);
				this.context.lineTo(this.getX() + this.size - this.size/4, this.getY() + this.size/4);
				this.context.lineTo(this.getX() + this.size - this.size/4, this.getY());
			}

			this.context.fill();
			//this.context.stroke();
			this.context.closePath();
		}
	}
}
