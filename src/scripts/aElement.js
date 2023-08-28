class Element {

	constructor(boardWidth, boardHeight) {

		this.container = gameContainer;
		this.canvas = gameCanvas;
		this.context = this.canvas.getContext("2d");

		// board squares
		this.boardWidth = boardWidth;7
		this.boardHeight = boardHeight;

		this.elementSize = this.canvas.width / this.boardWidth;
		this.size = this.elementSize;
	}

	resize() {
		this.elementSize = this.canvas.width / this.boardWidth;
		this.size = this.elementSize;
	}
}
