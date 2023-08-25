class Game {

	constructor() {
		if(Game.instance) return Game.instance;
		this.stage = 1;
		this.turn = 0;
		this.initialized = false;
		Game.instance = this;
	}

	init() {
		this.initialized = true;
		console.log("stage:"+this.stage)
		let stageData = StageData.getStageData(this.stage);
		this.stageName = stageData.name;
		this.boardWidth = stageData.width;
		this.boardHeight = stageData.height;
		//this.board = new Board(this.boardWidth, this.boardHeight);
		//this.board.update();
		//this.board.draw();
		// TODO
	}

	resize() {
		//
	}
}