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
			moveDown();
		} else if (event.keyCode == 38) {
			//up
			moveUp();
		} else if (event.keyCode == 37) {
			//left
			moveLeft();
		} else if (event.keyCode == 39) {
			//right
			moveRight();
		}
	//} else if (event.keyCode == 32) {
		//switchState();
	//}
}

function onKeyUp(event) {
	//touchEndHandler();
}

function moveUp() {
	Board.instance.player.y --;
}

function moveDown() {
	Board.instance.player.y ++;
}

function moveLeft() {
	Board.instance.player.x --;
}

function moveRight() {
	Board.instance.player.x ++;
}
