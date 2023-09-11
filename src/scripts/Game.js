class Game {

	constructor(stage) {
		if (Game.instance) return Game.instance;
		this.stage = stage || stage;
		this.turn = 0;
		this.step = 0;
		Game.instance = this;
		const stageData = this.getStageData(this.stage);
		this.stageName = stageData.name;
		board = new Board(stageData);
		this.start();
	}

	start() {
		board.draw();
		this.loop = setInterval(() => {
			if (state <= 1) {
				// gameplay
				this.step ++;
				if (!earth) board.draw();
			} else {
				// switch state - will be loading new level
				clearInterval(this.loop);
				this.destroy();
				startGame(state > 2);
			}
		}, 1000 / 60);
	}

	resize() {
		board.resize();
		board.draw();
	}

	destroy() {
		Game.instance = null;
		board.destroy();
		board = null;
	}

	getStageData(id) {
		const obj = [
			{
				name: "Easter Island",
				size: 14, x: 7, y: 8,
				map: "fffffffffffffffc5fffff001ffff0005fff400013c020020d000003d0000ffd0005ff0015fff08fffff00fffffc3",
				data: "0000000000000002f000009030000660f000fd1074024800d302061831000003200f00903f0007200000b90000024",
				path: "",
			},
			{
				name: "Stage 1",
				size: 5, x: 2, y: 2,
				map: "f7f0300000c0",
				data: "00004426420c",
				path: "  0"//"       5    5    ec   2d"
			},
			{
				name: "Stage 1",
				size: 5, x: 2, y: 2,
				map: "f7f0308000c0",
				data: "00020010500d",
				path: ""
			},
			{
				name: "Stage 1",
				size: 5, x: 2, y: 2,
				map: "c4f0308000c0",
				data: "00020010500d",
				path: ""
			},
			{
				name: "Stage 1",
				size: 5, x: 2, y: 2,
				map: "d5c0022800083",
				data: "00007c424ec2c",
				path: ""
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