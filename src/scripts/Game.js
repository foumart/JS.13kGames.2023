class Game {

	constructor(stage) {
		if (Game.instance) return Game.instance;
		this.stage = stage || stage;
		this.turn = 0;
		this.step = 0;
		//this.randoms = [];
		/*for (let i = 0; i < 99; i ++) {
			this.randoms.push(Math.random());
		}*/
		Game.instance = this;
		
		this.initialized = true;
		this.initStage();
		this.start();
	}

	start() {
		this.board.draw();
		this.loop = setInterval(() => {
			if (state <= 1) {
				this.step ++;
				this.board.draw();
			} else {
				clearInterval(this.loop);
				this.destroy();
				startGame();
			}
		}, 1000 / 60);
	}

	initStage() {
		const stageData = StageData.getStageData(this.stage);
		this.stageName = stageData.name;
		this.board = new Board(stageData);
	}

	resize() {
		this.board.resize();
		this.board.draw();
	}

	/*random() {
		return this.randoms[this.step % 96];
	}*/

	destroy() {
		Game.instance = null;
		this.board.destroy();
		this.board = null;
	}
}