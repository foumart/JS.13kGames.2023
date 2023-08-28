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

// global sizes
let width;
let height;
let canvasScale;

const resources = ['533', '50a', '5d1', '39b', '518', '39a', '5b1'];

let game;

// onclick="console.log(this.innerHTML.codePointAt(0)+' : '+this.innerHTML.codePointAt(0).toString(16))"
// 🗿  U+1F5FF &#128511; \1F5FF :moyai:
// 🌴 U+1F334 &#127796; \1F334
// 🌳 U+1F333 &#127795; \1F333
// 📿 U+1F4FF &#128255; \1F4FF
// ⛰ 9968 : 26f0

function getEmojiCode(code) {
	return `&#x1F${resources[code]};`;
}

function initializeGame() {
	window.addEventListener("resize", resize, false);

	if (mobile) {
		// mobile events
		mainDiv.ontouchstart = touchStartHandler;
		mainDiv.ontouchend = touchEndHandler;
	} else {
		// desktop events
		mainDiv.onmousedown = touchStartHandler;
		mainDiv.onmouseup = touchEndHandler;
	}

	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	createUI();
	resize();
}

function createUI() {
	uiDiv.innerHTML = "";

	generateUIButton(uiDiv, 0, toggleFullscreen);
	generateUIButton(uiDiv, 1, toggleSound);

	if (!state) {
		// Generate Main Menu
		generateUIButton(uiDiv, "Start New Game", switchState);
	} else {
		// Generate In-Game UI

	}
}

function generateUIButton(div, code, handler) {
	const button = document.createElement('div');
	button.addEventListener(mobile ? "touchstart" : "mousedown", handler.bind(this));
	button.innerHTML = code >= 0 ? getEmojiCode(code) : code;
	button.className = "button " + (code >= 0 ? "icon" : "label");
	button.id = "button_" + code;
	div.appendChild(button);
}

function resize(e) {
	width = window.innerWidth;
	height = window.innerHeight;
	if (width > height) {
		gameCanvas.width = height;
		gameCanvas.height = height;
	} else {
		gameCanvas.width = width;
		gameCanvas.height = width;
	}

	if (game) game.resize();

	// set html positionings
	uiDiv.style.width = mainDiv.style.width = width + 'px';
	uiDiv.style.height = mainDiv.style.height = height + 'px';

	if (width > height) {
		gameCanvas.style.left = gameContainer.style.left = "50%";
		gameCanvas.style.top = gameCanvas.style.marginTop = 0;
		gameCanvas.style.marginLeft = gameContainer.style.marginLeft = `-${height / 2}px`;
	} else {
		gameCanvas.style.top = gameContainer.style.top = "50%";
		gameCanvas.style.left = gameCanvas.style.marginLeft = 0;
		gameCanvas.style.marginTop = gameContainer.style.marginTop = `-${width / 2}px`;
	}

	// TODO: UI
	uiDiv.children[0].style = `float:right;transform:scale(${this.getScale(width, height)});transform-origin: top right;`;
	uiDiv.children[1].style = `float:left;transform:scale(${this.getScale(width, height)});transform-origin: top left;`;

	if (uiDiv.children[2]) uiDiv.children[2].style = `left:50%;transform:translateX(-50%) translateY(-50%);top:50%;`;
}

function getScale(h, w){
	return (h < w ? h : w) / (state ? 1500 : 1000);
}

const keysHeld = [];
function onKeyDown(event) {console.log(event.keyCode)
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
		}
	} else if (event.keyCode == 32) {
		//switchState();
	}
}

function onKeyUp(event) {
	//touchEndHandler();
}

function touchStartHandler(event) {
	if (!state) {
		if (event.target.id == "uiDiv") switchState();
	} else {

	}

	//console.log("touchStartHandler",event.target);
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

function touchEndHandler(event) {
	if (!state) {
		return;
	}

	console.log("touchEndHandler",event.target);
}



function toggleSound(event) {
	console.log("toggleSound");
}

function startGame() {
	game = new Game();
	game.init();
}