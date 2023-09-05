class MapTile extends Tile {
	
	constructor(x, y, type) {
		super(x, y, type);
	}

	resize() {
		super.resize();
		this.draw();
	}

	static buffer() {
		// Create a pattern, offscreen
		const patternCanvas = document.createElement("canvas");
		const patternContext = patternCanvas.getContext("2d");

		patternCanvas.width = 40;
		patternCanvas.height = 30;

		patternContext.fillStyle = "#988";
		patternContext.fillRect(0, 0, patternCanvas.width/2, patternCanvas.height/2);
		patternContext.fillStyle = "#776";
		patternContext.fillRect(patternCanvas.width/2, 0, patternCanvas.width/2, patternCanvas.height/2);
		patternContext.fillStyle = "#786";
		patternContext.fillRect(0, patternCanvas.height/2, patternCanvas.width/2, patternCanvas.height/2);
		patternContext.fillStyle = "#898";
		patternContext.fillRect(patternCanvas.width/2, patternCanvas.height/2, patternCanvas.width/2, patternCanvas.height/2);
		
		const ctx = gameCanvas.getContext("2d");

		return ctx.createPattern(patternCanvas, "repeat");
	}
}
