// TODO: remove this - all elements with IDs are global objects in js
const mainDiv = document.getElementById("mainDiv");
const uiDiv = document.getElementById("uiDiv");
const gameCanvas = document.getElementById("gameCanvas");
const gameContainer = document.getElementById("gameContainer");

// global vars
const mobile = isTouchDevice();
var eventName = isTouchDevice() ? "touchstart" : "click";
function isTouchDevice() {
	return ("ontouchstart" in window && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
}
//var passive = {passive:true};

let state = 0;
let paused = false;
let stage = 0;

// global sizes
let width;
let height;
let canvasScale;

// emoji icons used on title screen
const resources = ['30e', '533', '50a', '5FF'];

let game;

let earth;

function getEmojiCode(code) {
	return `&#x1F${resources[code]};`;
}

function initializeGame() {
	window.addEventListener("resize", resize, false);

	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	createUI();
	resize();
}

function createUI() {
	uiDiv.innerHTML = "";
	gameCanvas.style = "transition: transform 3s";

	if (!state && !stage) {
		// Generate the zoom-in Earth effect
		earth = document.createElement('div');
		earth.innerHTML = getEmojiCode(0);
		earth.className = "earth animate";
		mainDiv.insertBefore(earth, gameCanvas);
	}

	generateUIButton(uiDiv, 1, toggleFullscreen);
	generateUIButton(uiDiv, 2, toggleSound);

	if (!state) {
		// Generate Main Menu
		generateUIButton(uiDiv, 3, switchState, "button");
		//generateUIButton(uiDiv, 3, switchState, "button");

		if (uiDiv.children[2]) {
			uiDiv.children[2].innerHTML += " Play";
			uiDiv.children[2].addEventListener(eventName, this.switchState.bind(this));
		}
		
		/*if (uiDiv.children[3]) {
			uiDiv.children[3].innerHTML += " Settings";
			uiDiv.children[3].addEventListener(eventName, this.switchState.bind(this));
		}*/

		if (!stage) {
			setTimeout(() => {
				earth.style.transform = "scale(90,90)";
				gameCanvas.style.transform = "rotate(-90deg)";
				uiDiv.children[2].style.display = "none";
				//uiDiv.children[3].style.display = "none";
			}, 1);
	
			setTimeout(() => {
				gameCanvas.style.transform = "rotate(0)";
				game = new Game(stage);
				TweenFX.to(game.board, 200, {scale: 0.9, tilt: 0.9});
			}, 750);

			setTimeout(() => {
				uiDiv.children[2].style.display = "block";
				//uiDiv.children[3].style.display = "block";
			}, 5000);
			
			setTimeout(() => {
				mainDiv.removeChild(earth);
				document.body.style.backgroundColor = "#0078d7";
			}, 2000);
		} else {
			/*setTimeout(() => {
				uiDiv.children[2].style.display = "block";
			}, 1);*/
		}
	} else {
		// Generate In-Game UI
	}
}

function generateUIButton(div, code, handler, className = "button icon") {
	const button = document.createElement('div');
	button.addEventListener(mobile ? "touchstart" : "mousedown", handler.bind(this));
	button.innerHTML = getEmojiCode(code);
	button.className = className;
	button.id = "button_" + code;
	div.appendChild(button);
}

function resize(e) {
	width = window.innerWidth;
	height = window.innerHeight;

	// set html positionings
	uiDiv.style.width = mainDiv.style.width = width + 'px';
	uiDiv.style.height = mainDiv.style.height = height + 'px';

	if (width > height) {
		gameCanvas.width = height;
		gameCanvas.height = height;
		gameContainer.style.width = height + "px";
		gameContainer.style.height = height + "px";
		if (state) uiDiv.style.width = ((width - height) / 2) + 'px';
	} else {
		gameCanvas.width = width;
		gameCanvas.height = width;
		gameContainer.style.width = width + "px";
		gameContainer.style.height = width + "px";
		if (state) uiDiv.style.height = ((height - width) / 2) + 'px';
	}

	if (game) game.resize();

	if (width > height) {
		gameCanvas.style.left = gameContainer.style.left = "50%";
		gameCanvas.style.top = gameCanvas.style.marginTop = 0; gameContainer.style.top = gameContainer.style.marginTop = 0;
		gameCanvas.style.marginLeft = gameContainer.style.marginLeft = `-${height / 2}px`;
	} else {
		gameCanvas.style.top = gameContainer.style.top = "50%";
		gameCanvas.style.left = gameCanvas.style.marginLeft = 0; gameContainer.style.left = gameContainer.style.marginLeft = 0;
		gameCanvas.style.marginTop = gameContainer.style.marginTop = `-${width / 2}px`;
	}

	// TODO: UI
	uiDiv.children[0].style = `float:right;transform:scale(${this.getScale(width, height)});transform-origin: top right;`;
	uiDiv.children[1].style = `float:left;transform:scale(${this.getScale(width, height)});transform-origin: top left;`;

	if (uiDiv.children[2]) {
		uiDiv.children[2].style = `top:75%;margin:auto;position:absolute;font-size:${72*this.getScale(width, height)}px;right:20%`;
	}
	
	/*if (uiDiv.children[3]) {
		uiDiv.children[3].style = `top:68%;margin:auto;position:absolute;font-size:${64*this.getScale(width, height)}px;right:20%`;
	}*/
}

function getScale(h, w){
	return (h < w ? h : w) / (state ? 1500 : 1000);
}

const keysHeld = [];
function onKeyDown(event) {//console.log(event.keyCode)
	if (state) {
		if (event.keyCode == 65 && keysHeld.indexOf(65) == -1) {
			//switchState();
		} else if (event.keyCode == 80) {// P pause
			paused = !paused;
		} else if (event.keyCode == 82) {// R reset
			resize();

			//reset
		} else if (event.keyCode == 13) {
			debugger
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
	} else if (event.keyCode == 32) {
		//switchState();
	}
}

function onKeyUp(event) {
	//touchEndHandler();
}

function switchState() {
	if (!state) {
		state = 1;
		createUI();
		startGame();
		resize();
	} else {

	}
}

function toggleSound(event) {
	console.log("toggleSound");
}

function startGame() {
	stage ++;
	game.reloadStage();
	//state = 2;
	//if (game) {
		//game = null;
	//}
	//game = new Game(stage);
}