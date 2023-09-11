// TODO: remove this - all elements with IDs are global objects in js
const mainDiv = document.getElementById("mainDiv");
const uiDiv = document.getElementById("uiDiv");
const inDiv = document.getElementById("inDiv");
const gameCanvas = document.getElementById("gameCanvas");
const gameContainer = document.getElementById("gameContainer");
const gameContext = gameCanvas.getContext("2d");

// global vars
const intoSpeed = 99;
const mobile = isTouchDevice();
let portrait;
const eventName = isTouchDevice() ? "touchstart" : "click";
function isTouchDevice() {
	return ("ontouchstart" in window && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
}

let state = 0;// changes when starting a level
let stage = 1;// 0 - title screen, > 1 - directly load any level

// global sizes
let width;
let height;
let canvasScale;

let tween = { earth: 1, board: 0 };
let uiState;

// global objects
let game;
let board;
let player;
let action;

// ui stuff
let earth;
let controls, upButton, leftButton, rightButton, downButton, centerButton, actionButton;
let title, playButton, fullscreenButton, soundButton, uiInfo, hilight;

// resources
let wood;
let mana;
let rock;
// resource needed prediction
let predictRock = 0;

//let palms, trees, rocks;

// onclick="console.log(this.innerHTML.codePointAt(0)+' : '+this.innerHTML.codePointAt(0).toString(16))"

// entry point
function initializeGame() {
	window.addEventListener("resize", resize, false);
	//window.addEventListener("orientationchange", resize, false);

	document.addEventListener("keydown", onKeyDown);
	//document.addEventListener("keyup", onKeyUp);

	PixelArt.init();

	createUI();
	resize();
}

function createUI() {
	gameContainer.innerHTML = "";
	uiDiv.innerHTML = "";
	inDiv.innerHTML = "";
	if (!state) {
		title = document.createElement("div");
		inDiv.appendChild(title).className = "title";
	}

	uiInfo = document.createElement("div");
	uiDiv.appendChild(uiInfo).className = "info";

	if (!state && !stage) {
		// Generate the zoom-in Earth effect
		earth = document.createElement('div');
		earth.innerHTML = '<svg viewBox="0 0 36 36"><circle fill="#0078d7" cx="18" cy="18" r="18"/><path fill="#5cd13b" d="M30.13,23.75,24.5,19.5l-3,.58-1.08,1.17-1.89-.91,1-1.51-2.86-.57-.31-2.35,1.72-1.1,1.88,1.1,2.12-4.47,3.76-.55.24-1.65,2-.47-4.93-5-.32,2.36-2.26.73L19.47,5l2.45-1.92L18.67,1.92,11.34,3.73l-2-1.51A16.64,16.64,0,0,0,3.66,7.15l1.61-.41,1.57.94-.23,2.59,1.41,3L19.92,22,18.5,24.5l3.17,3.67-1.83,6.5h1.08l6.5-5.25,1.25-2.75,2.2-1.83Z"/></svg>';
		earth.className = "earth";
		mainDiv.insertBefore(earth, gameCanvas);
	}

	// Fullscreen and Sound buttons
	fullscreenButton = generateUIButton(uiDiv, '&#x26F6', toggleFullscreen);
	soundButton = generateUIButton(uiDiv, '&#9881', toggleSound);// sound: '&#x1F50A'

	// Generate Main Menu
	if (!state && !stage) {
		// Play Button
		playButton = generateUIButton(gameContainer, '&#x1F5FF', switchState, "button hidden");
		// Settings / Credits ?
		//generateUIButton(uiDiv, 4, showCredits, "button");

		if (!stage) {
			// Earth zoom-in transition
			gameCanvas.style.transform = "rotate(-45deg) scale(0.1)";
			TweenFX.to(tween, intoSpeed, {earth: 99}, 0, () => {
				if (earth) earth.style.transform = `scale(${tween.earth})`;

				if (tween.earth > 25 && !uiState) {
					uiState = 1;
					// Generate game board and zoom it in
					game = new Game(stage);
					TweenFX.to(tween, intoSpeed, {board: 1}, 0, () => {
						gameCanvas.style.transform = `rotate(${-45 * (1-tween.board)}deg) scale(${tween.board})`;
					}, () => {
						uiState = 2;
						// Show Play button
						playButton.innerHTML += " Play";
						playButton.className = "button";
						// Generate the Moai Alley title logo
						generateScaledTitle();

						uiInfo.innerHTML = "Easter Island";
					});
				}

				// Changing background color to blue when the Earth planet has been zoomed-in enough,
				// also removing the planet at the same time.
				if (earth && tween.board > 0.7) {
					document.body.style.backgroundColor = "#0078d7";
					mainDiv.removeChild(earth);
					earth = 0;
				}
			});
		}
	} else {
		game = new Game(stage);// had to add this here to avoid an error when directly loading a level
		// Generate In-Game UI
		controls = document.createElement('div');
		inDiv.appendChild(controls);
		upButton = generateUIButton(controls, '&#x25B2', board.actionUp.bind(board));//^
		leftButton = generateUIButton(controls, '&#x25C0', board.actionLeft.bind(board));//<
		rightButton = generateUIButton(controls, '&#x25B6', board.actionRight.bind(board));//>
		downButton = generateUIButton(controls, '&#x25BC', board.actionDown.bind(board));//v

		leftButton.style = "float:left;margin:0 0 0 -5px";
		rightButton.style = "float:right;margin:0";
		upButton.style = downButton.style = "margin:0;width:100%";

		actionButton = generateUIButton(inDiv, '', board.doAction.bind(board), "icon action");

		document.body.style.backgroundColor = "#0078d7";
		game = new Game(stage);
		switchState(0, 3);
	}
}

function generateUIButton(div, code, handler, className = "button icon") {
	const button = document.createElement('div');
	button.addEventListener(eventName, handler.bind(this));
	button.innerHTML = code;
	button.className = className;
	div.appendChild(button);
	return button;
}

function generateScaledTitle() {
	if (uiState == 2) {
		title.innerHTML = '';
		title.style.transform = '';
		generateTitle();
		title.style.transform = `scale(${portrait ? 0.75 : 1})`;
	}
}

function resize(e) {
	width = window.innerWidth;
	height = window.innerHeight;

	// Set HTML positionings
	mainDiv.style.width = width + 'px';
	mainDiv.style.height = height + 'px';

	if (width > height) {
		// Landscape
		portrait = false;
		gameCanvas.width = height;
		gameCanvas.height = height;
		gameContainer.style.width = height + "px";
		gameContainer.style.height = height + "px";

		inDiv.style.minHeight = 'unset';
		inDiv.style.minWidth = (160 + width/(!state ? 3 : 9)) + 'px';
		inDiv.style.maxHeight = 'unset';
		inDiv.style.width = ((width - height) / 2) + 'px';
		inDiv.style.height = height + 'px';

		uiDiv.style.minHeight = 'unset';
		uiDiv.style.minWidth = '250px';
		uiDiv.style.maxWidth = '350px';
		uiDiv.style.width = ((width - height) / 1.8) + 'px';
		uiDiv.style.height = height/(2-state) + 'px';
		uiDiv.style.right = 0;
	} else {
		// Portrait
		portrait = true;
		gameCanvas.width = width;
		gameCanvas.height = width;
		gameContainer.style.width = width + "px";
		gameContainer.style.height = width + "px";

		e = 99 + height/8;
		inDiv.style.minWidth = 'unset';
		inDiv.style.maxHeight = (e < 350 ? 350 : e) + 'px';
		inDiv.style.minHeight = (200 + height/20) + 'px';
		inDiv.style.height = '100%';
		inDiv.style.width = width + 'px';

		if (state) inDiv.style.bottom = 0;

		uiDiv.style.maxWidth = 'unset';
		uiDiv.style.minWidth = 'unset';
		uiDiv.style.minHeight = (e) + 'px';
		uiDiv.style.height = (height - width) + 'px';
		uiDiv.style.width = width + 'px';
	}

	// Resize in-game UI elements
	if (upButton) {
		upButton.style.fontSize = `${128*getScale(width, height)}px`;
		downButton.style.fontSize = `${128*getScale(width, height)}px`;
		leftButton.style.fontSize = `${128*getScale(width, height)}px`;
		rightButton.style.fontSize = `${128*getScale(width, height)}px`;
		actionButton.style.fontSize = `${128*getScale(width, height)}px`;

		// Depending on orientation change parent of the following:
		(portrait ? inDiv : uiDiv).appendChild(actionButton);
		(!portrait ? inDiv : uiDiv).appendChild(uiInfo);

		if (portrait) {
			controls.style = "bottom:auto;width:auto";
			actionButton.style.maxWidth = "250px";
			actionButton.style.height = "100%";
			actionButton.style.lineHeight = (50 + height/9) + 'px';
		} else {
			controls.style = "bottom:0;width:100%";
			actionButton.style.maxWidth = "300px";
			actionButton.style.height = (99 + height/3) + "px";
			actionButton.style.lineHeight = (99 + height/4) + "px";
		}

		updateInGameUI();
	}

	gameContext.imageSmoothingEnabled = false;

	if (game) game.resize();

	// Centering the game canvas. On more squared screens it is pushed to the right/top side
	// in order to provide space for touch screen controls on the left/bottom, or the logo on the title screen.
	if (portrait) {
		gameCanvas.style.top = gameContainer.style.top = "50%";
		gameCanvas.style.left = gameCanvas.style.marginLeft = 0;
		gameContainer.style.left = gameContainer.style.marginLeft = 0;
		gameCanvas.style.marginTop = gameContainer.style.marginTop =
			`-${!state ? width / 2.5 : height - width < width / 6 ? height / 2 : width / 1.7}px`;
	} else {
		gameCanvas.style.left = gameContainer.style.left = "50%";
		gameCanvas.style.top = gameCanvas.style.marginTop = 0;
		gameContainer.style.top = gameContainer.style.marginTop = 0;
		gameCanvas.style.marginLeft = gameContainer.style.marginLeft =
			`-${width - height < height / 6 ? width / 2 - (width-height) : height / 2.4}px`;
	}

	// Reposition / resize general UI buttons
	// Fullscreen button
	fullscreenButton.style = `float:right;font-size:${72*getScale(width, height)}px;`;
	// Sound button
	soundButton.style = `float:right;font-size:${72*getScale(width, height)}px;text-align:right`;
	// Play button
	if (playButton) {
		playButton.style = `top:75%;margin:auto;position:absolute;font-size:${72*getScale(width, height)}px;right:${portrait?9:1}%`;
	}

	uiInfo.style.fontSize = 40 * getScale(width, height) + "px";

	// Credits?
	/*if (uiDiv.children[3]) {
		uiDiv.children[3].style = `top:68%;margin:auto;position:absolute;font-size:${64*this.getScale(width, height)}px;right:20%`;
	}*/

	// Title Logo
	generateScaledTitle();
}

function getScale(h, w){
	return (h < w ? h : w) / 1000;
}

function switchState(event, loadStage) {
	if (!state) {
		state = loadStage ? 3 : 2;
		// check Game loop interval on where the state actually changes
	} else if (state > 1) {
		state = 1;
	}
}

function toggleSound(event) {
	console.log("toggleSound");
}

function startGame(dontAdvanceStage) {
	if (!dontAdvanceStage) stage ++;
	switchState();
	game = new Game(stage);
	createUI();
	resize();
}