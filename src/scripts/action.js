
// TODO:
//actionButton = generateUIButton(inDiv, '&#x1f528', board.doAction.bind(board));// 🔨: &#x1f528, 🪓:&#x1FA93,  ⛏️⛏: &#x26cf (&#9935)

function updateInGameUI() {
	actionButton.style.opacity = 1;
	actionButton.style.pointerEvents = "all";

	let html = '';
	//if (hilight) hilight.highlighted 

	if (action > 2) {
		html = `<div style="width:100%;font-size:${80*getScale(width, height)}px;margin-top:${90*getScale(width, height)}px">Carve</div>`;
		html += `<div style="width:100%;font-size:${36*getScale(width, height)}px;margin-top:${160*getScale(width, height)}px">+10 Stone</div>`;
		html += `<div style="width:100%;font-size:${36*getScale(width, height)}px;margin-top:${200*getScale(width, height)}px">-1 Mana</div>`;
		actionButton.innerHTML = html + `&#x1f528`;
	} else 

	if (!board.mapData[player.y][player.x] && !board.unitsData[player.y][player.x] && board.pathData[player.y][player.x] == -1) {
		// Pave
		action = 1;
		board.placeRoad(player.x, player.y, 0, 1);// Not placing a road here - just getting prediction to update predictRock
		html = `<div style="width:100%;font-size:${80*getScale(width, height)}px;margin-top:${90*getScale(width, height)}px">Pave</div>`;
		html += `<div style="width:100%;font-size:${36*getScale(width, height)}px;margin-top:${160*getScale(width, height)}px">-${predictRock*4} Stone</div>`;
		html += `<div style="width:100%;font-size:${36*getScale(width, height)}px;margin-top:${200*getScale(width, height)}px">-1 Wood</div>`;
		actionButton.innerHTML = html + `&#9935`;
		if (rock < predictRock || wood < 1) {
			disableActionButton();
			actionButton.children[1].style.color = "#faa";
		}
	} else if (!board.mapData[player.y][player.x] && (board.unitsData[player.y][player.x] == 1 || board.unitsData[player.y][player.x] == 2)) {
		// Chop
		action = 2;
		const treeType = board.units[board.getUnit(player.x, player.y)].type;
		html = `<div style="width:100%;font-size:${80*getScale(width, height)}px;margin-top:${90*getScale(width, height)}px">Chop</div>`;
		html += `<div style="width:100%;font-size:${36*getScale(width, height)}px;margin-top:${160*getScale(width, height)}px">+${4-treeType} Wood</div>`;
		html += `<div style="width:100%;font-size:${36*getScale(width, height)}px;margin-top:${200*getScale(width, height)}px">-1 Mana</div>`;
		actionButton.innerHTML = html + `&#x1FA93`;
		if (mana < 2) {
			disableActionButton();
			actionButton.children[2].style.color = "#faa";
		}
	} else if (board.pathData[player.y][player.x] > -1) {
		//action = 0;
		/*html = `<div style="width:100%;font-size:${70*getScale(width, height)}px;margin-top:${85*getScale(width, height)}px">Walk</div>`;
		html += `<div style="width:100%;font-size:${32*getScale(width, height)}px;margin-top:${142*getScale(width, height)}px">-1 Mana</div>`;
		actionButton.innerHTML = html + `&#x1F5FF`;
		disableActionButton();*/

		actionButton.innerHTML = "";
	} else {
		//action = 0;
		actionButton.innerHTML = "";
	}

	uiInfo.innerHTML = `<div>Stage: ${stage}</div><br><br><div>Stone: ${rock * 4}</div><br><div> Wood: ${wood}</div><br> Mana: ${mana}`;
	uiInfo.children[0].style.fontSize = 60 * getScale(width, height) + "px";
}

function disableActionButton() {
	actionButton.style.opacity = 0.5;
	actionButton.style.pointerEvents = "none";
}
