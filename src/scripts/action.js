
// TODO:
//actionButton = generateUIButton(inDiv, '&#x1f528', board.doAction.bind(board));// 🔨: &#x1f528, 🪓:&#x1FA93,  ⛏️⛏: &#x26cf (&#9935)

function updateInGameUI() {

	//console.log(this.mapData[this.player.y - 1][this.player.x], this.unitsData[this.player.y - 1][this.player.x], this.pathData[this.player.y - 1][this.player.x]);
	//actionButton = generateUIButton(inDiv, '&#x1f528', board.doAction.bind(board));

	if (!board.mapData[player.y][player.x] && !board.unitsData[player.y][player.x] && board.pathData[player.y][player.x] == -1) {
		// Pave
		action = 1;
		actionButton.innerHTML = `<div style="width:100%;font-size:${70*getScale(width, height)}px;margin-top:${80*getScale(width, height)}px">Pave</div>&#9935`;
	} else if (!board.mapData[player.y][player.x] && (board.unitsData[player.y][player.x] == 1 || board.unitsData[player.y][player.x] == 2)) {
		// Chop
		action = 2;
		actionButton.innerHTML = `<div style="width:100%;font-size:${70*getScale(width, height)}px;margin-top:${80*getScale(width, height)}px">Chop</div>&#x1FA93`;
	} else if (action > 2) {
		actionButton.innerHTML = `<div style="width:100%;font-size:${70*getScale(width, height)}px;margin-top:${80*getScale(width, height)}px">Carve</div>&#x1f528`;
	} else {
		//action = 0;
		actionButton.innerHTML = "";
	}

}