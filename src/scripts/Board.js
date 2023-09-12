class Board {
	
	constructor(stageData) {

		this.boardWidth = stageData.size + 2;
		this.boardHeight = stageData.size + 2;
		this.map = stageData.map.split('');
		this.path = stageData.path.split('');
		this.data = stageData.data.split('');
		rock = stageData.rock;
		wood = stageData.wood;
		mana = stageData.mana;

		if (Board.instance) {
			return Board.instance;
		}

		Board.instance = this;

		this.scale = !state ? 1 : 1;
		this.tilt = !state ? 0.8 : 0.88;

		// Used for map data compression
		// TODO: should use binary => hex, ex: "A8030600" instead of "9580033c000c"
		Board.pairs = [
			[0, 0],// 0
			[0, 1],// 1
			[0, 2],// 2
			[0, 3],// 3
			[1, 0],// 4
			[1, 1],// 5
			[1, 2],// 6
			[1, 3],// 7
			[2, 0],// 8
			[2, 1],// 9
			[2, 2],// 10 A
			[2, 3],// 11 B
			[3, 0],// 12 C
			[3, 1],// 13 D
			[3, 2],// 14 E
			[3, 3]//  15 F
		];

		this.mapData = [];
		this.unitsData = [];
		this.pathData = [];

		let x, y;
		for (y = 0; y < this.boardHeight - 2; y++) {
			this.mapData.push([]);
			this.unitsData.push([]);
			this.pathData.push([]);
			for (x = 0; x < this.boardWidth - 2; x++) {
				this.mapData[y].push(3);
				this.unitsData[y].push(0);
				this.pathData[y].push(-1);
			}
		}

		this.extractData(this.map, this.mapData);
		this.extractHex(this.path, this.pathData);
		this.extractData(this.data, this.unitsData);

		// Adding tiles on each side of the map in order to have space for coasts
		this.mapData.push([]);
		this.unitsData.push([]);
		this.pathData.push([]);
		this.mapData.unshift([]);
		this.unitsData.unshift([]);
		this.pathData.unshift([]);

		for (y = 0; y < this.boardHeight; y++) {
			if (!y || y == this.boardHeight - 1) {
				for (x = 0; x < this.boardWidth; x++) {
					this.mapData[y].push(3);
					this.unitsData[y].push(0);
					this.pathData[y].push(-1);
				}
			} else {
				this.mapData[y].push(3);
				this.unitsData[y].push(0);
				this.pathData[y].push(-1);
				this.mapData[y].unshift(3);
				this.unitsData[y].unshift(0);
				this.pathData[y].unshift(-1);
			}
		}

		// Walk through all water tiles to convert into coastal edges
		for (y = 0; y < this.boardHeight; y++) {
			for (x = 0; x < this.boardWidth; x++) {
				if (this.mapData[y][x] == 3) {
					if (y < this.boardHeight-1 && this.mapData[y + 1][x] < 3) {
						if (this.mapData[y][x] < 4) {
							this.mapData[y][x] = 4;
							if (x < this.boardWidth-1 && y < this.boardHeight-1 && this.mapData[y + 1][x + 1] == 3) {
								this.mapData[y][x + 1] = 8;
							}
							if (x && y < this.boardHeight-1 && this.mapData[y + 1][x - 1] == 3) {
								this.mapData[y][x - 1] = 11;
							}
						}

						if (x && this.mapData[y][x - 1] < 3) {
							this.mapData[y][x] = 12;
						}

						if (x < this.boardWidth-1 && this.mapData[y][x + 1] < 3) {
							this.mapData[y][x] = 15;
						}
					} else if (y && this.mapData[y - 1][x] < 3) {
						if (this.mapData[y][x] < 4) {
							this.mapData[y][x] = 6;
							if (x < this.boardWidth-1 && y && this.mapData[y - 1][x + 1] > 2) {
								this.mapData[y][x + 1] = 9;
							}
							if (x && y && this.mapData[y - 1][x - 1] > 2) {
								this.mapData[y][x - 1] = 10;
							}
						}

						if (x && this.mapData[y][x - 1] < 3) {
							this.mapData[y][x] = 13;
						}

						if (x < this.boardWidth-1 && this.mapData[y][x + 1] < 3) {
							this.mapData[y][x] = 14;
						}
					} else if (x < this.boardWidth-1 && this.mapData[y][x + 1] < 3) {
						this.mapData[y][x] = 7;
					} else if (x && this.mapData[y][x - 1] < 3) {
						this.mapData[y][x] = 5;
					}
				}
			}
		}

		this.createPlayer(stageData.x, stageData.y);

		//if (state) this.createButtons();

		// Generate field - add MapTiles, PathTiles and Units
		this.field = [];
		this.path = [];
		this.units = [];
		let tile, fieldArr, pathArr, mapType, unitType;
		for(y = 0; y < this.boardHeight; y++) {
			fieldArr = [];
			pathArr = [];
			for(x = 0; x < this.boardWidth; x++) {
				mapType = this.mapData[y][x];
				tile = new MapTile(x, y, mapType);
				if (!mapType) tile.frame = Math.random() * 5.5 | 0;
				fieldArr.push(tile);
				pathArr.push(new PathTile(x, y, this.pathData[y][x]));
				if (mapType == 2) {
					this.units.push(new Obstacle(x, y, 4));
				}

				unitType = this.unitsData[y][x];
				if (unitType > 0) {
					// On the initial level make sure to place Moai instead of rocks
					// (because level compression only records 2 bits of data: empty, palm, tree, rock)
					if (mapType == 1 && unitType == 3) unitType = 5;

					this.units.push(new Unit(x, y, unitType));
				}
			}
			this.field.push(fieldArr);
			this.path.push(pathArr);
		}
	}

	extractData(map, data) {
		map.forEach((element, index) => {
			const tileData = Board.pairs[parseInt(element, 16)];
			const y = (index * 2) / (this.boardHeight - 2) | 0;
			const x = index * 2 % (this.boardHeight - 2);
			data[y][x] = tileData[0];
			if (x < this.boardWidth - 3) data[y][x + 1] = tileData[1];
			else if (y < this.boardHeight - 3) data[y + 1][0] = tileData[1];
		});
	}

	extractHex(map, data) {
		map.forEach((element, index) => {
			if (element != ' ') data[index / (this.boardHeight - 2) | 0][index % (this.boardHeight - 2)] = parseInt(element, 16);
		});
	}

	/*createButtons() {
		this.buttons = [];
		this.buttonsArr = [];
		let x, y, arr, button;
		for(y = 0; y < this.boardHeight - 2; y++) {
			arr = [];
			for(x = 0; x < this.boardWidth - 2; x++) {
				button = new Button(x, y);
				button.btn.addEventListener("mouseover", this.buttonOver.bind(this));
				button.btn.addEventListener("mouseout", this.buttonOut.bind(this));
				button.btn.addEventListener(eventName, this.clickButton.bind(this));
				this.buttonsArr.push(button);
				arr.push(button);
			}
			this.buttons.push(arr);
		}
	}*/

	createPlayer(x, y) {
		player = new Player(x, y);
	}

	isPassable(x, y) {
		return !this.mapData[y][x] && this.unitsData[y][x] < 3;
	}

	getUnit(x, y) {
		let id = -1;
		this.units.forEach((unit, index) => {
			if (unit.x == x && unit.y == y) {
				id = index;
			}
		});

		return id;
	}

	// Place a Road tile with regards to all adjacent Road tiles.
	// When prediction is applied the function only modifies predictRock.
	placeRoad(x, y, adjacent = 0, prediction = 0) {
		if (prediction == 1 || !adjacent) predictRock = 0;
		if (this.pathData[y][x + 1] > -1 && this.pathData[y][x - 1] > -1 && this.pathData[y + 1][x] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1.5;// ╬
			if (!prediction) this.pathData[y][x] = 15;
		} else if (this.pathData[y][x + 1] > -1 && this.pathData[y][x - 1] > -1 && this.pathData[y + 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1.25;// ╦
			if (!prediction) this.pathData[y][x] = 8;
		} else if (this.pathData[y][x + 1] > -1 && this.pathData[y][x - 1] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1.25;// ╩
			if (!prediction) this.pathData[y][x] = 10;
		} else if (this.pathData[y][x - 1] > -1 && this.pathData[y + 1][x] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1.25;// ╣
			if (!prediction) this.pathData[y][x] = 9;
		} else if (this.pathData[y][x + 1] > -1 && this.pathData[y + 1][x] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1.25;// ╠
			if (!prediction) this.pathData[y][x] = 7;
		} else if (this.pathData[y][x + 1] > -1 && this.pathData[y][x - 1] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1;// =
			if (!prediction) this.pathData[y][x] = 6;
		} else if (this.pathData[y + 1][x] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1;// ||
			if (!prediction) this.pathData[y][x] = 5;
		} else if (this.pathData[y][x + 1] > -1 && this.pathData[y + 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1;// ╔
			if (!prediction) this.pathData[y][x] = 11;
		} else if (this.pathData[y][x + 1] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1;// ╚
			if (!prediction) this.pathData[y][x] = 14;
		} else if (this.pathData[y][x - 1] > -1 && this.pathData[y + 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1;// ╔
			if (!prediction) this.pathData[y][x] = 12;
		} else if (this.pathData[y][x - 1] > -1 && this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 1;// ╚
			if (!prediction) this.pathData[y][x] = 13;
		} else if (this.pathData[y][x - 1] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 0.75;// ]
			if (!prediction) this.pathData[y][x] = 4;
		} else if (this.pathData[y][x + 1] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 0.75;// [
			if (!prediction) this.pathData[y][x] = 2;
		} else if (this.pathData[y + 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 0.75;// п
			if (!prediction) this.pathData[y][x] = 3;
		} else if (this.pathData[y - 1][x] > -1) {
			predictRock += adjacent || prediction == 2 ? 0.25 : 0.75;// u
			if (!prediction) this.pathData[y][x] = 1;
		} else {
			predictRock += adjacent || prediction == 2 ? 0.25 : 0.5;// o
			if (!prediction) this.pathData[y][x] = 0;
		}

		this.path[y][x].type = this.pathData[y][x];

		// Update the adjacent road tiles as well, or just get predictions for them (prediction*2 to not get into an infinite loop)
		if (!adjacent || prediction == 1) {
			if (this.pathData[y][x + 1] > -1 && !this.mapData[y][x + 1]) this.placeRoad(x + 1, y, 1, prediction*2);
			if (this.pathData[y][x - 1] > -1 && !this.mapData[y][x - 1]) this.placeRoad(x - 1, y, 1, prediction*2);
			if (this.pathData[y + 1][x] > -1 && !this.mapData[y + 1][x]) this.placeRoad(x, y + 1, 1, prediction*2);
			if (this.pathData[y - 1][x] > -1 && !this.mapData[y - 1][x]) this.placeRoad(x, y - 1, 1, prediction*2);
		}
	}

	definePrevMove() {
		prevMove = player.y < attach.y ? 1 : player.x > attach.x ? 2 : player.y > attach.y ? 3 : player.x < attach.x ? 4 : 0;
		return prevMove;
	}

	// Perform action (chop, pave, carve, etc.)
	doAction() {
		if (action == 1) {
			if (rock < predictRock || wood < 1) {
				// TODO: [button disabled] sound
			} else {
				SoundFX.b(2);
				this.placeRoad(player.x, player.y);
				rock -= predictRock;
				wood -= 1;
			}
		} else if (action == 2) {
			let unit = this.getUnit(player.x, player.y);

			if (unit > -1) {
				if (mana < 2) {
					// TODO: [button disabled] sound
				} else {
					unit = this.units.splice(unit, 1)[0];
					this.unitsData[player.y][player.x] = 0;
					wood += (4-unit.type);
					mana -= 1;
				}
			}
		} else if (action == 5) {// Attach (Move)
			this.actionAttach(hilight);
		} else if (action == 6) {// Stop
			this.stopMoving();//attach.highlighted = 1;
		}

		updateInGameUI();
	}

	actionAttach(unit) {
		// TODO: [attach] sound
		unit.highlighted = 0;
		unit.attached = 1;
		attach = unit;
		action = 6;
	}

	actionStuck(x, y) {
		const unit = this.units[this.getUnit(player.x + x, player.y + y)];
		if (unit && state > 0) {
			if (unit.highlighted) {
				if (unit.type == 3) {// Carve!
					// TODO: [carving] sound
					SoundFX.b(0);
					rock += 2;
					mana -= 1;
					unit.convertToMoai();
					this.placeRoad(unit.x, unit.y);
					unit.highlighted = 1;
					hilight = unit;
					action = unit.type;
				} else {// Attach and prepare to pull a statue
					this.actionAttach(unit);
				}
			} else if (unit.attached) {// Swap with Moai
				// TODO: [swap / move] sound
				if (y == -1) {
					player.moveUp(16);
					unit.moveDown(16);
				} else if (y == 1) {
					player.moveDown(16);
					unit.moveUp(16);
				} else if (x == -1) {
					player.moveLeft(16);
					unit.moveRight(16);
				} else if (x == 1) {
					player.moveRight(16);
					unit.moveLeft(16);
				}
				
				this.unitsData[player.y][player.x] = 0;
				this.unitsData[unit.y][unit.x] = 5;
				this.placeRoad(unit.x, unit.y);
				rock -= predictRock;
				wood -= 1;
				mana -= 1;
			} else if (unit.type == 3 || unit.type == 5) {
				unit.highlighted = 1;
				hilight = unit;
				action = unit.type;
			} else console.log(unit.type);
			updateInGameUI();
		} else {
			const ahu = this.field[player.y + y][player.x + x];
			if (ahu.type == 1 && attach) {
				player.moveUp();
				attach.moveUp(8, 5);
				this.placeRoad(attach.x, attach.y);
				rock -= predictRock;
				wood -= 1;
				mana -= 1; 
				setTimeout(() => {
					attach.attached = 0;
					player.moveDown();
					attach.moveUp(16, 5);
					this.stopMoving();
					// TODO: reduce number of empty ahu's, level complete
				}, 133);
			}
		}
	}
	
	actionUp() {
		if (!this.isPassable(player.x, player.y - 1)) {
			this.actionStuck(0, -1);
		} else if (player.offsetY == -0.5) {
			if (attach) {
				if (this.definePrevMove()) {
					attach.move(16, 5);
					this.placeRoad(attach.x, attach.y);
					rock -= predictRock;
					wood -= 1;
					mana -= 1;
				}
			} else {
				this.removeHilight();
			}

			player.moveUp();
			updateInGameUI();
		}
	}
	
	actionDown() {
		if (!this.isPassable(player.x, player.y + 1)) {
			this.actionStuck(0, 1);
		} else if (player.offsetY == -0.5) {
			if (attach) {
				if (this.definePrevMove()) {
					attach.move(16, 5);
					this.placeRoad(attach.x, attach.y);
					rock -= predictRock;
					wood -= 1;
					mana -= 1;
				}
			} else {
				this.removeHilight();
			}

			player.moveDown();
			updateInGameUI();
		}
	}
	
	actionLeft() {
		if (!this.isPassable(player.x - 1, player.y)) {
			this.actionStuck(-1, 0);
		} else if (!player.offsetX) {
			if (attach) {
				if (this.definePrevMove()) {
					attach.move(16, 5);
					this.placeRoad(attach.x, attach.y);
					rock -= predictRock;
					wood -= 1;
					mana -= 1;
				}
			} else {
				this.removeHilight();
			}

			player.moveLeft();
			updateInGameUI();
		}
	}
	
	actionRight() {
		if (!this.isPassable(player.x + 1, player.y)) {
			this.actionStuck(1, 0);
		} else if (!player.offsetX) {
			if (attach) {
				if (this.definePrevMove()) {
					attach.move(16, 5);
					this.placeRoad(attach.x, attach.y);
					rock -= predictRock;
					wood -= 1;
					mana -= 1;
				}
			} else {
				this.removeHilight();
			}

			player.moveRight();
			updateInGameUI();
		}
	}

	stopMoving() {
		if (attach) {
			attach.attached = 0;
			//attach.highlighted = 1;
			hilight = attach;
			attach = 0;
			action = 0;
		}
	}

	removeHilight() {
		if (hilight) {
			hilight.highlighted = 0;
			action = 0;
		}
	}


	// reposition buttons
	/*resize() {
		if (this.buttonsArr) for (let i = 0; i < this.buttonsArr.length; i ++) {
			this.buttonsArr[i].resize();
		}
	}*/

	// Draw the board
	draw() {
		// TODO: Check if necessarry
		/*gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
		if (state) {
			gameContext.fillStyle = "#0078d7";
			gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
		}*/

		for(let y = 0; y < this.boardHeight; y++) {
			for(let x = 0; x < this.boardWidth; x++) {
				//this.buttons[y][x].hilight();
				this.field[y][x].resize();
				this.path[y][x].resize();
			}
		}

		// Draw units from top to bottom inserting the player in the proper depth position
		let drawn;
		for (let i = 0; i < this.units.length; i ++) {
			if (!drawn && player.y < this.units[i].y) {// TODO: fix depth - (player.y < 3 && this.units[i].type == 5 ? 1 : 0)) {
				drawn = true;
				player.resize();
			}
			this.units[i].resize();
		}

		if (!drawn) {
			player.resize();
		}

		// TODO: remove
		//drawFPS();
	}

	/*buttonOver(event) {
		let unit = this.field[event.target.y][event.target.x];
		let btn = this.buttons[event.target.y][event.target.x];
	}

	buttonOut(event){
		let unit = this.field[event.target.y][event.target.x];
		let btn = this.buttons[event.target.y][event.target.x];
	}

	clickButton(event){
		let unit = this.field[event.target.y][event.target.x];
		console.log(unit);
	}*/

	destroy() {
		Board.instance = null;
	}
}
