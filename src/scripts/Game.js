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
		const stageData = this.getStageData(this.stage);
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

	getStageData(id) {
		const obj = [
			{
				name: "Easter Island",
				size: 14, x: 7, y: 8,
				map: "aaaaaaaaaaaaaaa85aaaaa001aaaa0005aaa4000128030030900000290000aa90005aa0015aaa0caaaaa00aaaaa82",
				data: "0000000000000002f000009030000660f000fd1074024800d302061831000003200f00903f0007200000b90000024",
				path: "",//"                  eac",
			},
			{
				name: "Stage 1",
				size: 5, x: 2, y: 0,
				map: "9580033c000c",
				data: "00007c424ec2c",
				path: ""//"     26d",
			},
			{
				name: "Stage 2",
				size: 5, x: 3, y: 0,
				map: "00033c000c",
				data: "007c424ec2c",
				path: "   26d",
			}
		];

		obj[id].id = id;

		return obj[id];
	}
}