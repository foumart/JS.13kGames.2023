const keysHeld = [];
function onKeyDown(event) {//console.log(event.keyCode)
	//if (state) {
		/*if (event.keyCode == 65 && keysHeld.indexOf(65) == -1) {
			//switchState();
		} else if (event.keyCode == 80) {// P pause
			paused = !paused;
		} else*/
		
		if (event.keyCode == 82) {// R reset
			resize();
		} else if (event.keyCode == 32) {
			console.log(board.mapData);
			console.log(board.unitsData);
			console.log(board.pathData);
			console.log(board.player.x, board.player.y);
		} else if (event.keyCode == 13) {
			debugger;
		} else if (event.keyCode == 40) {
			//down
			board.actionDown();
		} else if (event.keyCode == 38) {
			//up
			board.actionUp();
		} else if (event.keyCode == 37) {
			//left
			board.actionLeft();
		} else if (event.keyCode == 39) {
			//right
			board.actionRight();
		}
	//} else if (event.keyCode == 32) {
		//switchState();
	//}
}

function onKeyUp(event) {
	//touchEndHandler();
}
