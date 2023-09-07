// TODO: remove this - all elements with IDs are global objects in js
const mainDiv = document.getElementById("mainDiv");
const uiDiv = document.getElementById("uiDiv");
const inDiv = document.getElementById("inDiv");
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

let stage = 0;

const intoSpeed = 99;
let tween = {earth: 0, board: 0, half: 0};

let game;
let earth;
let controls, upButton, leftButton, rightButton, downButton, centerButton;

// entry point
function initializeGame() {
	window.addEventListener("resize", resize, false);

	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	PixelArt.init();

	createUI();
	resize();
}

function createUI() {
	uiDiv.innerHTML = "";
	inDiv.innerHTML = "";
	gameContainer.innerHTML = "";

	if (!state && !stage) {
		// Generate the zoom-in Earth effect
		earth = document.createElement('div');
		earth.innerHTML = '&#x1F30E';//getEmojiCode(0);
		earth.className = "earth";
		mainDiv.insertBefore(earth, gameCanvas);
	}

	generateUIButton(uiDiv, '&#x1F50A', toggleSound);
	generateUIButton(uiDiv, '&#x1F533', toggleFullscreen);

	if (!state) {
		// Generate Main Menu
		generateUIButton(gameContainer, '&#x1F5FF', switchState, "button");
		//generateUIButton(uiDiv, 4, showCredits, "button");

		setTimeout(() => {
			gameContainer.firstChild.innerHTML += " Play";
			gameContainer.firstChild.style.display = "none";
		}, 1);

		if (!stage) {
			gameCanvas.style.transform = "rotate(-45deg) scale(0.01)";

			TweenFX.to(tween, intoSpeed, {earth: 99}, 0, () => {
				earth.style.transform = `scale(${tween.earth})`;

				if (tween.earth > 25 && !tween.half) {
					tween.half = 1;
					game = new Game(stage);
					TweenFX.to(tween, intoSpeed, {board: 1}, 0, () => {
						gameCanvas.style.transform = `rotate(${-45 * (1-tween.board)}deg) scale(${tween.board})`;
					}, () => {
						gameContainer.firstChild.style.display = "block";
						//TODO: title
						this.generateTitle();
					});
				}

				if (tween.board > 0.7) {
					document.body.style.backgroundColor = "#0078d7";
					//earth.style.opacity = 1 - (tween.board-0.8) * 5;
				}
			}, () => {
				mainDiv.removeChild(earth);
				earth = 0;
			});
		}
	} else {
		// Generate In-Game UI
		controls = document.createElement('div');
		controls.style = "max-width:260px;bottom:0;transform-origin:bottom left";
		inDiv.appendChild(controls);
		upButton = generateUIButton(controls, '&#x25B2', moveUp);//^
		leftButton = generateUIButton(controls, '&#x25C0', moveLeft);//<
		rightButton = generateUIButton(controls, '&#x25B6', moveRight);//>
		downButton = generateUIButton(controls, '&#x25BC', moveDown);//v

		upButton.style.margin = "auto";
		//leftButton.style.float = "left";
		//rightButton.style.float = "right";
		leftButton.style = "float:left;margin:unset;margin-left:20px;";
		rightButton.style = "float:right;margin:unset;width:99px";
		downButton.style.margin = "auto";
	}
}

function generateUIButton(div, code, handler, className = "button icon") {
	const button = document.createElement('div');
	button.addEventListener(eventName, handler.bind(this));
	button.innerHTML = code;//getEmojiCode(code);
	button.className = className;
	button.id = "button_" + code;
	div.appendChild(button);
	return button;
}

function resize(e) {
	width = window.innerWidth;
	height = window.innerHeight;

	// set html positionings
	mainDiv.style.width = width + 'px';
	mainDiv.style.height = height + 'px';

	if (width > height) {
		// landscape
		gameCanvas.width = height;
		gameCanvas.height = height;
		gameContainer.style.width = height + "px";
		gameContainer.style.height = height + "px";

		inDiv.style.minHeight = 'unset';
		inDiv.style.minWidth = (150 + width/10) + 'px';
		inDiv.style.width = ((width - height) / 2) + 'px';
		inDiv.style.height = height + 'px';

		if (controls && ((width - height) / 2) > 260) {
			controls.style.transform = `scale(${((width - height) / 2) / 260})`;
		}

		uiDiv.style.minHeight = 'unset';
		uiDiv.style.minWidth = '200px';
		uiDiv.style.width = ((width - height) / 2) + 'px';
		uiDiv.style.height = height + 'px';
		uiDiv.style.right = 0;
	} else {
		// portrait
		gameCanvas.width = width;
		gameCanvas.height = width;
		gameContainer.style.width = width + "px";
		gameContainer.style.height = width + "px";

		uiDiv.style.minWidth = 'unset';
		uiDiv.style.minHeight = '100px';
		uiDiv.style.height = ((height - width) / 2) + 'px';
		uiDiv.style.width = width + 'px';

		inDiv.style.minWidth = 'unset';
		inDiv.style.minHeight = '260px';
		inDiv.style.height = ((height - width) / 2) + 'px';
		inDiv.style.width = width + 'px';
		if (state) inDiv.style.bottom = 0;
	}

	gameContext.imageSmoothingEnabled = false;

	if (game) game.resize();

	// centering the game canvas but on more squared screens it will be pushed to the right/top side
	// in order to provide space for touch screen controls on the left/bottom.
	if (width > height) {
		gameCanvas.style.left = gameContainer.style.left = "50%";
		gameCanvas.style.top = gameCanvas.style.marginTop = 0;
		gameContainer.style.top = gameContainer.style.marginTop = 0;
		gameCanvas.style.marginLeft = gameContainer.style.marginLeft =
			`-${!state ? height / 2 : width - height < height / 6 ? width / 2 - (width-height) : height / 2.4}px`;
	} else {
		gameCanvas.style.top = gameContainer.style.top = "50%";
		gameCanvas.style.left = gameCanvas.style.marginLeft = 0;
		gameContainer.style.left = gameContainer.style.marginLeft = 0;
		gameCanvas.style.marginTop = gameContainer.style.marginTop =
			`-${!state ? width / 2 : height - width < width / 6 ? height / 2 : width / 1.7}px`;
	}

	// TODO: UI
	uiDiv.children[0].style = `float:left;transform:scale(${getScale(width, height)});transform-origin: top left;`;
	uiDiv.children[1].style = `float:right;transform:scale(${getScale(width, height)});transform-origin: top right;`;

	if (gameContainer.firstChild) {
		gameContainer.firstChild.style = `top:75%;margin:auto;position:absolute;font-size:${72*getScale(width, height)}px;right:20%`;
	}
	
	/*if (uiDiv.children[3]) {
		uiDiv.children[3].style = `top:68%;margin:auto;position:absolute;font-size:${64*this.getScale(width, height)}px;right:20%`;
	}*/
}

function getScale(h, w){
	return (h < w ? h : w) / 1000;
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