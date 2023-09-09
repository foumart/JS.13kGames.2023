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
			console.log(Board.instance.mapData);
			console.log(Board.instance.unitsData);
			console.log(Board.instance.pathData);
			console.log(Board.instance.player.x, Board.instance.player.y);
		} else if (event.keyCode == 13) {
			debugger;
		} else if (event.keyCode == 40) {
			//down
			actionDown();
		} else if (event.keyCode == 38) {
			//up
			actionUp();
		} else if (event.keyCode == 37) {
			//left
			actionLeft();
		} else if (event.keyCode == 39) {
			//right
			actionRight();
		}
	//} else if (event.keyCode == 32) {
		//switchState();
	//}
}

function onKeyUp(event) {
	//touchEndHandler();
}

function actionUp() {
	if (!Board.instance.isPassable(Board.instance.player.x, Board.instance.player.y-1)) {

	} else {
		moveUp();
	}
}

function actionDown() {
	if (!Board.instance.isPassable(Board.instance.player.x, Board.instance.player.y+1)) {
		console.log("stuck");
	} else {
		moveDown();
	}
}

function actionLeft() {
	if (!Board.instance.isPassable(Board.instance.player.x-1, Board.instance.player.y)) {

	} else {
		moveLeft();
	}
}

function actionRight() {
	if (!Board.instance.isPassable(Board.instance.player.x+1, Board.instance.player.y)) {

	} else {
		moveRight();
	}
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
