class Game {

	constructor() {
		if (Game.instance) return Game.instance;
		this.stage = 1;
		this.turn = 0;
		this.step = 0;
		this.initialized = false;
		this.randoms = [];
		for (let i = 0; i < 99; i ++) {
			this.randoms.push(Math.random());
		}
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

		setInterval(() => {
			this.step ++;
			this.board.draw();
		}, 1000 / 30);
	}

	resize() {
		this.board.resize();
		this.board.draw();
	}

	random() {
		return this.randoms[this.step % 96];
	}
}