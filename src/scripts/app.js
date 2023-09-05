// TODO: remove this - all elements with IDs are global objects in js
const mainDiv = document.getElementById("mainDiv");
const uiDiv = document.getElementById("uiDiv");
const gameCanvas = document.getElementById("gameCanvas");
const gameContainer = document.getElementById("gameContainer");
const gameContext = gameCanvas.getContext("2d");

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

// emoji icons used on title screen
const resources = ['30e', '533', '50a', '5FF'];
let stage = 0;
const intoSpeed = 100;

let game;

let earth;

function getEmojiCode(code) {
	return `&#x1F${resources[code]};`;
}

// entry point
function initializeGame() {
	window.addEventListener("resize", resize, false);

	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	gameCanvas.style = "transition: transform 3s";

	PixelArt.init();

	createUI();
	resize();
}

function createUI() {
	uiDiv.innerHTML = "";

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
				TweenFX.to(game.board, 2*intoSpeed, {scale: 0.9, tilt: 0.8});//200
			}, 7*intoSpeed);

			setTimeout(() => {
				uiDiv.children[2].style.display = "block";
				//uiDiv.children[3].style.display = "block";
				
				//TODO: title
				//this.generateTitle();

			}, 50*intoSpeed);
			
			setTimeout(() => {
				mainDiv.removeChild(earth);
				document.body.style.backgroundColor = "#0078d7";
			}, 20*intoSpeed);
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

	gameContext.imageSmoothingEnabled = false;

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

function switchState() {
	if (!state) {
		state = 2;
		// check Game loop interval on where the state actually changes
	} else if (state == 2) {
		state = 1;
	}
}

function toggleSound(event) {
	console.log("toggleSound");
}

function startGame() {
	stage ++;
	switchState();
	game = new Game(stage);
	createUI();
	resize();
}