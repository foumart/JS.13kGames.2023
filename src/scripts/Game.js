class Game {

	constructor() {
		if (Game.instance) return Game.instance;
		this.stage = 1;
		this.turn = 0;
		this.step = 0;
		this.randoms = [];
		for (let i = 0; i < 99; i ++) {
			this.randoms.push(Math.random());
		}
		Game.instance = this;
		
		this.initialized = true;
		this.initStage();
		this.start();
	}

	start() {
		this.board.draw();
		setInterval(() => {
			if (state == 1) {
				this.step ++;
				this.board.draw();
			} else {
				console.log("STOPPED");
			}
		}, 1000 / 60);
	}

	initStage() {
		const stageData = StageData.getStageData(this.stage);
		this.stageName = stageData.name;
		this.unitX = stageData.x;
		this.unitY = stageData.y;
		this.boardWidth = stageData.width;
		this.boardHeight = stageData.height;

		this.board = new Board(stageData);
	}

	resize() {
		this.board.resize();
		this.board.draw();
	}

	random() {
		return this.randoms[this.step % 96];
	}
}