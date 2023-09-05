const keysHeld = [];
function onKeyDown(event) {//console.log(event.keyCode)
	//if (state) {
		if (event.keyCode == 65 && keysHeld.indexOf(65) == -1) {
			//switchState();
		} else if (event.keyCode == 80) {// P pause
			paused = !paused;
		} else if (event.keyCode == 82) {// R reset
			resize();

			//reset
		} else if (event.keyCode == 13) {
			debugger;
		} else if (event.keyCode == 40) {
			//down
			Board.instance.player.y ++;
		} else if (event.keyCode == 38) {
			//up
			//if () {
			//	return;
			//}
			Board.instance.player.y --;
			
		} else if (event.keyCode == 37) {
			//left
			Board.instance.player.x --;
		} else if (event.keyCode == 39) {
			//right
			Board.instance.player.x ++;
		}
	//} else if (event.keyCode == 32) {
		//switchState();
	//}
}

function onKeyUp(event) {
	//touchEndHandler();
}
