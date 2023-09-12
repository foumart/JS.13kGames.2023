const keysHeld = [];
function onKeyDown(event) {//console.log(event.keyCode)
	if (event.keyCode == 82) {// R reset
		console.log("mapData:", board.mapData);
		console.log("unitsData:", board.unitsData);
		console.log("pathData:", board.pathData);
		console.log(player.x, player.y);
		debugger;
	} else if (event.keyCode == 13 || event.keyCode == 32) { // action (chop a tree, carve a rock, pave a road)
		if (state > 0) board.doAction();
		else switchState();
	} else if (event.keyCode == 40) { // down
		board.actionDown();
	} else if (event.keyCode == 38) { // up
		board.actionUp();
	} else if (event.keyCode == 37) { // left
		board.actionLeft();
	} else if (event.keyCode == 39) { // right
		board.actionRight();
	}
}

/*function onKeyUp(event) {
	//touchEndHandler();
}*/
