class Board {
	
	constructor(stageData) {

		this.boardWidth = stageData.width;
		this.boardHeight = stageData.height;
		this.map = stageData.map.split('');
		this.path = stageData.path.split('');
		this.data = stageData.data.split('');

		if (Board.instance) {
			return Board.instance;
		}

		Board.instance = this;

		// used for data compression
		// TODO: use binary => hex, ex: "A8030600"
		Board.pairs = [
			[0, 0], [0, 1], [0, 2], [0, 3],
			[1, 0], [1, 1], [1, 2], [1, 3],
			[2, 0], [2, 1], [2, 2], [2, 3],
			[3, 0], [3, 1], [3, 2], [3, 3]
		];

		this.mapData = [];
		this.unitsData = [];
		this.pathData = [];

		for (let y = 0; y < this.boardHeight; y++) {
			this.mapData.push([]);
			this.unitsData.push([]);
			this.pathData.push([]);
			for (let x = 0; x < this.boardWidth; x++) {
				this.mapData[y].push(0);
				this.unitsData[y].push(0);
				this.pathData[y].push(-1);
			}
		}

		this.extractData(this.map, this.mapData);
		this.extractHex(this.path, this.pathData);
		this.extractData(this.data, this.unitsData);

		//this.unitsData[stageData.y][stageData.x] = 5;
		this.createPlayer(stageData.x, stageData.y);

		console.log(this.mapData);
		console.log(this.unitsData);
		console.log(this.pathData);

		this.createButtons();

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
		this.pattern = ctx.createPattern(patternCanvas, "repeat");

		this.clear();
	}

	createPlayer(x, y) {
		this.player = new Player(this.boardWidth, this.boardHeight, x, y);
	}

	extractData(map, data) {
		map.forEach((element, index) => {
			const tileData = Board.pairs[parseInt(element, 16)];
			const y = (index * 2) / this.boardHeight | 0;
			const x = index * 2 % this.boardHeight;
			data[y][x] = tileData[0];
			if (x < this.boardWidth - 1) data[y][x + 1] = tileData[1];
			else if (y < this.boardHeight - 1) data[y + 1][0] = tileData[1];
		});
	}

	extractHex(map, data) {
		map.forEach((element, index) => {
			if (element != ' ') data[index / this.boardHeight | 0][index % this.boardHeight] = parseInt(element, 16);
		});
	}

	createButtons() {
		this.buttons = [];
		this.buttonsArr = [];
		let x, y, arr, button;
		for(y = 0; y < this.boardHeight; y++) {
			arr = [];
			for(x = 0; x < this.boardWidth; x++) {
				button = new Button(this.boardWidth, this.boardHeight, x, y);
				button.btn.addEventListener("mouseover", this.buttonOver.bind(this));
				button.btn.addEventListener("mouseout", this.buttonOut.bind(this));
				button.btn.addEventListener(eventName, this.clickButton.bind(this));
				this.buttonsArr.push(button);
				arr.push(button);
			}
			this.buttons.push(arr);
		}
	}

	clear() {
		this.field = [];
		this.path = [];
		this.units = [];
		let x, y, fieldArr, pathArr, unitsArr, unitType;
		for(y = 0; y < this.boardHeight; y++) {
			fieldArr = [];
			pathArr = [];
			unitsArr = [];
			for(x = 0; x < this.boardWidth; x++) {
				unitType = this.mapData[y][x];
				fieldArr.push(new MapTile(this.boardWidth, this.boardHeight, x, y, unitType));
				pathArr.push(new PathTile(this.boardWidth, this.boardHeight, x, y, this.pathData[y][x]));
				if (this.unitsData[y][x] > 0) this.units.push(new Unit(this.boardWidth, this.boardHeight, x, y, this.unitsData[y][x]));
				if (unitType == 3) {
					this.units.push(new Obstacle(this.boardWidth, this.boardHeight, x, y, 6));
				}
			}
			this.field.push(fieldArr);
			this.path.push(pathArr);
		}
	}

	// reposition buttons
	resize() {
		for (let i = 0; i < this.buttonsArr.length; i ++) {
			this.buttonsArr[i].resize();
		}
	}

	// draw the board grid frames and the unit selection stroke on the canvas
	draw() {
		//this.clear();
		gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);
		for(let y = 0; y < this.boardHeight; y++) {
			for(let x = 0; x < this.boardWidth; x++) {
				//this.buttons[y][x].hilight();
				this.field[y][x].resize();
				this.path[y][x].resize();
			}
		}

		for (let i = 0; i < this.units.length; i ++) {
			this.units[i].resize();
		}

		this.player.resize();
	}

	buttonOver(event) {
		let unit = this.field[event.target.y][event.target.x];
		let btn = this.buttons[event.target.y][event.target.x];
		//btn.hilightEmpty();
	}

	buttonOut(event){
		let unit = this.field[event.target.y][event.target.x];
		let btn = this.buttons[event.target.y][event.target.x];
		//btn.hilight();
	}

	clickButton(event){
		let unit = this.field[event.target.y][event.target.x];
		console.log(unit);
	}
}