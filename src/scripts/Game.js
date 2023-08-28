class Game {

	constructor() {
		if (Game.instance) return Game.instance;
		this.stage = 1;
		this.turn = 0;
		this.initialized = false;
		Game.instance = this;
	}

	init() {
		this.initialized = true;

		const stageData = StageData.getStageData(this.stage);
		this.stageName = stageData.name;
		this.unitX = stageData.x;
		this.unitY = stageData.y;
		this.boardWidth = stageData.width;
		this.boardHeight = stageData.height;

		this.board = new Board(stageData);
		this.board.draw();
	}

	resize() {
		this.board.draw();
	}
}