class Unit extends Tile {

	constructor(boardWidth, boardHeight, x, y, type) {
		super(boardWidth, boardHeight, x, y, type);

		// temporary display
		this.characters = [
			128526, // player
			127795, // tree
			127796, // palm tree
			9973,   // mountain
			128511,  // moai
			128526 // player
		];
	}

	resize() {
		super.resize();
		this.draw();
	}

	draw() {
		this.context.font = (this.size/2) + 'px Arial';
		this.context.fillStyle = "#FFFFFF";
		this.context.fillText(
			String.fromCodePoint(this.type==5?this.characters[this.type] : this.characters[this.type]),
			this.x * this.size + this.size / 5,
			this.y * this.size + this.size / 1.5
		);
	}
}