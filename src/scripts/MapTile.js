class MapTile extends Tile {
	
	constructor(boardWidth, boardHeight, x, y, type) {
		super(boardWidth, boardHeight, x, y, type);
	}

	resize() {
		super.resize();
		this.draw();
	}
}