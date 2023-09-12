
// TODO:
//actionButton = generateUIButton(inDiv, '&#x1f528', board.doAction.bind(board));// 🔨: &#x1f528, 🪓:&#x1FA93,  ⛏️⛏: &#x26cf (&#9935)

function updateInGameUI() {
	actionButton.style.opacity = 1;
	actionButton.style.pointerEvents = "all";

	let html = '';
	let scale = getScale(width, height);

	if (action == 6) {
		// Stop Moai walking
		html = `<div style="width:100%;font-size:${70*scale}px;margin-top:${99*scale}px">Stop</div>`;
		html += `<div style="width:100%;font-size:${60*scale}px;margin-top:${162*scale}px">Moai</div>`;
		html += `<div style="width:100%;font-size:${35*scale}px;margin-top:${215*scale}px">walking</div>`;
		actionButton.innerHTML = html + `<div class="emoticon">&#x2716</div>`;
	} else 
	if (action == 5) {
		// Walk the Moai
		html = `<div style="width:100%;font-size:${99*scale}px;margin-top:${(predictRock?99:128)*scale}px">Walk</div>`;
		html += `<div style="width:100%;font-size:${45*scale}px;margin-top:${(predictRock?180:225)*scale}px">-1 Mana</div>`;
		if (predictRock) {
			html += `<div style="width:100%;font-size:${40*scale}px;margin-top:${225*scale}px">-${predictRock*4} Stone</div>`;
			html += `<div style="width:100%;font-size:${35*scale}px;margin-top:${268*scale}px">-1 Wood</div>`;
		}
		actionButton.innerHTML = html + `<div class="emoticon shake">&#x1f5ff</div>`;
	} else 
	if (action == 3) {
		// Carve a Moai statue
		html = `<div style="width:100%;font-size:${99*scale}px;margin-top:${99*scale}px">Carve</div>`;
		html += `<div style="width:100%;font-size:${45*scale}px;margin-top:${185*scale}px">+8 Stone</div>`;
		html += `<div style="width:100%;font-size:${40*scale}px;margin-top:${235*scale}px">-1 Mana</div>`;
		actionButton.innerHTML = html + `<div class="emoticon">&#x1f528</div>`;
	} else 

	if (!board.mapData[player.y][player.x] && !board.unitsData[player.y][player.x] && board.pathData[player.y][player.x] == -1) {
		// Pave
		action = 1;
		board.placeRoad(player.x, player.y, 0, 1);// Not placing a road here - just getting prediction to update predictRock
		html = `<div style="width:100%;font-size:${99*scale}px;margin-top:${99*scale}px">Pave</div>`;
		html += `<div style="width:100%;font-size:${45*scale}px;margin-top:${185*scale}px">-${predictRock*4} Stone</div>`;
		html += `<div style="width:100%;font-size:${40*scale}px;margin-top:${235*scale}px">-1 Wood</div>`;
		actionButton.innerHTML = html + `<div class="emoticon">&#9935</div>`;
		// Hilight in case mana is low and disable the action button
		if (rock < predictRock || wood < 1) {
			disableActionButton();
			actionButton.children[1].style.color = "#faa";
		}
	} else if (!board.mapData[player.y][player.x] && (board.unitsData[player.y][player.x] == 1 || board.unitsData[player.y][player.x] == 2)) {
		// Chop
		action = 2;
		const treeType = board.units[board.getUnit(player.x, player.y)].type;
		html = `<div style="width:100%;font-size:${99*scale}px;margin-top:${99*scale}px">Chop</div>`;
		html += `<div style="width:100%;font-size:${45*scale}px;margin-top:${185*scale}px">+${4-treeType} Wood</div>`;
		html += `<div style="width:100%;font-size:${40*scale}px;margin-top:${235*scale}px">-1 Mana</div>`;
		actionButton.innerHTML = html + `<div class="emoticon">&#x1fa93</div>`;
		// Hilight in case mana is low and disable the action button
		if (mana < 2) {
			disableActionButton();
			actionButton.children[2].style.color = "#faa";
		}
	} else if (board.pathData[player.y][player.x] > -1) {
		predictRock = 0;
		actionButton.innerHTML = "";
	} else {
		//action = 0;
		actionButton.innerHTML = "";
	}

	uiInfo.innerHTML = `<div>Stage: ${stage}</div><br><br><div>Stone: ${rock * 4}</div><br><div>Wood: ${wood}</div><br><div>Mana: ${mana}</div>M`;
	uiInfo.children[0].style.fontSize = 70 * scale + "px";
	uiInfo.children[7].style.color = mana == 1 ? "#fbb" : "#fff";
}

function disableActionButton() {
	actionButton.style.opacity = 0.5;
	actionButton.style.pointerEvents = "none";
}
