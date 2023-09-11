const keysHeld = [];
function onKeyDown(event) {//console.log(event.keyCode)
	if (state) {
		/*if (event.keyCode == 80) {// P pause
			paused = !paused;
		}*/
		
		if (event.keyCode == 13) {
			debugger;
		} else if (event.keyCode == 82) {// R reset
			console.log("mapData:", board.mapData);
			console.log("unitsData:", board.unitsData);
			console.log("pathData:", board.pathData);
			console.log(player.x, player.y);
			//resize();
			//Board.instance.scale = 1.5;
		} else if (event.keyCode == 32) {
			// action (chop a tree, carve a rock, pave a road)
			board.doAction();
		} else if (event.keyCode == 40) {
			// down
			board.actionDown();
		} else if (event.keyCode == 38) {
			// up
			board.actionUp();
		} else if (event.keyCode == 37) {
			// left
			board.actionLeft();
		} else if (event.keyCode == 39) {
			// right
			board.actionRight();
		}
	} else if (event.keyCode == 32 || event.keyCode == 13) {
		switchState();
	}
}

/*function onKeyUp(event) {
	//touchEndHandler();
}*/
