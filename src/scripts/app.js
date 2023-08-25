const mainDiv = document.getElementById("mainDiv");
const uiDiv = document.getElementById("uiDiv");
const gameDiv = document.getElementById("gameDiv");
const menuDiv = document.getElementById("menuDiv");

menuDiv.style.width = gameDiv.style.width = uiDiv.style.width = '1080px';
gameDiv.style.height = uiDiv.style.height = '1920px';
menuDiv.style.height = '128px';

const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let state = 0;
let paused = false;

// global sizes
const hardWidth = 1080;
const hardHeight = 1920;
let width;
let height;
let canvasScale;

const resources = ['533', '50a', '5d1', '39b', '518', '39a', '5b1'];

var game;

// onclick="console.log(this.innerHTML.codePointAt(0)+' : '+this.innerHTML.codePointAt(0).toString(16))"
// 🗿  U+1F5FF &#128511; \1F5FF :moyai:
// 🌴 U+1F334 &#127796; \1F334
// 🌳 U+1F333 &#127795; \1F333
// 📿 U+1F4FF &#128255; \1F4FF
// ⛰ 9968 : 26f0

function getEmojiCode(code) {
	return `&#x1F${resources[code]};`;
}

function runGame() {
	window.addEventListener("resize", resize, false);
	resize();

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
}

function createUI() {
	menuDiv.innerHTML = "";

	generateUIButton(menuDiv, 0, toggleFullscreen, "float:right;" + (state ? "transform:scale(0.75)" : "margin:20px"));
	generateUIButton(menuDiv, 1, toggleSound, "float:left;" + (state ? "transform:scale(0.75)" : "margin:20px 28px"));

	if (!state) {
		generateUIButton(menuDiv, "Start New Game", switchState, "position:fixed;left:340px;top:900px");
	}
}

function generateUIButton(div, code, handler, style) {
	const button = document.createElement('div');
	button.addEventListener(mobile ? "touchstart" : "mousedown", handler.bind(this));
	button.innerHTML = code >= 0 ? getEmojiCode(code) : code;
	button.className = "button " + (code >= 0 ? "icon" : "label");
	button.id = "button_" + code;
	button.style = style;
	div.appendChild(button);
}

function resize(e) {
	width = window.innerWidth;
	height = window.innerHeight;
	canvasScale = getScale();
	mainDiv.style.transform = `scale(${canvasScale})`;
	mainDiv.style.width = hardWidth + 'px';
	mainDiv.style.height = hardHeight + 'px';
	mainDiv.style.top = `${(height - hardHeight) / 2}px`;
	mainDiv.style.left = `${(width - hardWidth) / 2}px`;
	//e = gameCanvas.getBoundingClientRect();
	//offsetX = e.left;
	//offsetY = e.top;
}

function getScale(h, w){
	h = (height / hardHeight);
	w = (width / hardWidth)
	return h < w ? h : w;
}

const keysHeld = [];
function onKeyDown(event) {console.log(event.keyCode)
	if (state) {
		if (event.keyCode == 65 && keysHeld.indexOf(65) == -1) {
			//switchState();
		} else if (event.keyCode == 80) {// P pause
			paused = !paused;
		} else if (event.keyCode == 82) {// R reset
			//reset
		} else if (event.keyCode == 13) {
			debugger
		}
	} else if (event.keyCode == 32) {
		//switchState();
	}
}

function onKeyUp(event) {
	touchEndHandler();
}

function touchStartHandler(event) {
	//if (event.target == menuDiv.firstChild || event.target == menuDiv.children[1]) return;
	if (!state) {
		if (event.target.id == "menuDiv") switchState();
	} else {

	}

	//console.log("touchStartHandler",event.target);
}

function switchState() {
	if (!state) {
		state = 1;
		createUI();
		startGame();
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
	//initVariables();
	//resize();
}