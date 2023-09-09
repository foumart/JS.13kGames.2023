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
const eventName = isTouchDevice() ? "touchstart" : "click";
function isTouchDevice() {
	return ("ontouchstart" in window && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
}

let state = 0;
let stage = 0;// 0 - title screen, > 1 - directly load any level

// global sizes
let width;
let height;
let canvasScale;
let portrait;

let tween = { earth: 1, board: 0 };
let uiState;

let game;
let earth;
let controls, upButton, leftButton, rightButton, downButton, centerButton;
let title;

// entry point
function initializeGame() {
	window.addEventListener("resize", resize, false);
	//window.addEventListener("orientationchange", resize, false);

	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	PixelArt.init();

	createUI();
	resize();
}

function createUI() {
	uiDiv.innerHTML = "";
	inDiv.innerHTML = "";
	if (!state) {
		title = document.createElement("div");
		inDiv.appendChild(title).className = "title";
	}
	gameContainer.innerHTML = "";

	if (!state && !stage) {
		// Generate the zoom-in Earth effect
		earth = document.createElement('div');
		earth.innerHTML = '<svg viewBox="0 0 36 36"><circle fill="#0078D7" cx="18" cy="18" r="18"/><path fill="#5CD13B" d="M30.13,23.75,24.5,19.5l-3,.58-1.08,1.17-1.89-.91,1-1.51-2.86-.57-.31-2.35,1.72-1.1,1.88,1.1,2.12-4.47,3.76-.55.24-1.65,2-.47-4.93-5-.32,2.36-2.26.73L19.47,5l2.45-1.92L18.67,1.92,11.34,3.73l-2-1.51A16.64,16.64,0,0,0,3.66,7.15l1.61-.41,1.57.94-.23,2.59,1.41,3L19.92,22,18.5,24.5l3.17,3.67-1.83,6.5h1.08l6.5-5.25,1.25-2.75,2.2-1.83Z"/></svg>';//'&#x1F30E';//getEmojiCode(0);
		earth.className = "earth";
		mainDiv.insertBefore(earth, gameCanvas);
	}

	// Fullscreen and Sound buttons
	generateUIButton(uiDiv, '&#x1F533', toggleFullscreen);
	generateUIButton(uiDiv, '&#x1F50A', toggleSound);

	// Generate Main Menu
	if (!state && !stage) {
		// Play Button
		generateUIButton(gameContainer, '&#x1F5FF', switchState, "button");
		// Settings / Credits ?
		//generateUIButton(uiDiv, 4, showCredits, "button");

		setTimeout(() => {
			gameContainer.firstChild.innerHTML += " Play";
			gameContainer.firstChild.style.display = "none";
		}, 1);

		if (!stage) {
			// Earth zoom-in transition
			gameCanvas.style.transform = "rotate(-45deg) scale(0.1)";
			TweenFX.to(tween, intoSpeed, {earth: 99}, 0, () => {
				if (earth) earth.style.transform = `scale(${tween.earth})`;

				if (tween.earth > 25 && !uiState) {
					uiState = 1;
					// generate game board and zoom it in
					game = new Game(stage);
					TweenFX.to(tween, intoSpeed, {board: 1}, 0, () => {
						gameCanvas.style.transform = `rotate(${-45 * (1-tween.board)}deg) scale(${tween.board})`;
					}, () => {
						uiState = 2;
						// Show Play button
						gameContainer.firstChild.style.display = "block";
						// generate the Moai Alley title
						generateScaledTitle();
					});
				}

				// we change background color to blue when the earth planet has been zoomed-in enough
				// and remove the planet at the same time
				if (earth && tween.board > 0.7) {
					document.body.style.backgroundColor = "#0078d7";
					mainDiv.removeChild(earth);
					earth = 0;
				}
			});
		}
	} else {
		// Generate In-Game UI
		controls = document.createElement('div');
		controls.style = "bottom:0;transform-origin:bottom left";
		inDiv.appendChild(controls);
		upButton = generateUIButton(controls, '&#x25B2', moveUp);//^
		leftButton = generateUIButton(controls, '&#x25C0', moveLeft);//<
		rightButton = generateUIButton(controls, '&#x25B6', moveRight);//>
		downButton = generateUIButton(controls, '&#x25BC', moveDown);//v

		//upButton.style.margin = "auto";
		leftButton.style = "float:left;margin:0";
		rightButton.style = "float:right;margin:0;width:80px";
		upButton.style = downButton.style = "margin:0;width:100%";
	}

	// Load a level directly on load
	if (stage) {
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

function resize(e) {console.log("resize");
	width = window.innerWidth;
	height = window.innerHeight;

	// set html positionings
	mainDiv.style.width = width + 'px';
	mainDiv.style.height = height + 'px';

	if (width > height) {
		// landscape
		portrait = false;
		gameCanvas.width = height;
		gameCanvas.height = height;
		gameContainer.style.width = height + "px";
		gameContainer.style.height = height + "px";

		inDiv.style.minHeight = 'unset';
		inDiv.style.minWidth = (140 + width/(!state ? 3 : 9)) + 'px';
		inDiv.style.width = ((width - height) / 2) + 'px';
		inDiv.style.height = height + 'px';///2

		if (controls) {
			controls.style.width = "100%";
			//upButton.style.top = leftButton.style.top = rightButton.style.top = 0;
		}

		uiDiv.style.minHeight = 'unset';
		uiDiv.style.minWidth = '200px';
		uiDiv.style.width = ((width - height) / 2) + 'px';
		uiDiv.style.height = height/2 + 'px';
		uiDiv.style.right = 0;

		/*if (upButton) {
			upButton.style.top = leftButton.style.top = rightButton.style.top = 0;
		}*/
	} else {
		// portrait
		portrait = true;
		gameCanvas.width = width;
		gameCanvas.height = width;
		gameContainer.style.width = width + "px";
		gameContainer.style.height = width + "px";

		inDiv.style.minWidth = 'unset';
		inDiv.style.minHeight = (99 + height/7) + 'px';//'260px';
		inDiv.style.height = height / 2 + 'px';//((height - width) / 2)
		inDiv.style.width = width + 'px';
		if (state) inDiv.style.bottom = 0;

		if (controls) {
			controls.style.width = "auto";
		}

		uiDiv.style.minWidth = 'unset';
		uiDiv.style.minHeight = '100px';
		uiDiv.style.height = ((height - width) / 2) + 'px';
		uiDiv.style.width = width + 'px';
	}

	if (upButton) {
		upButton.style.fontSize = `${99*getScale(width, height)}px`;
		downButton.style.fontSize = `${99*getScale(width, height)}px`;
		leftButton.style.fontSize = `${99*getScale(width, height)}px`;
		rightButton.style.fontSize = `${99*getScale(width, height)}px`;
	}

	gameContext.imageSmoothingEnabled = false;

	if (game) game.resize();

	// centering the game canvas but on more squared screens it will be pushed to the right/top side
	// in order to provide space for touch screen controls on the left/bottom.
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
			`-${!state ? height / 2 : width - height < height / 6 ? width / 2 - (width-height) : height / 2.4}px`;
	}

	// Reposition / resize UI buttons
	uiDiv.children[0].style = `float:right;transform:scale(${getScale(width, height)});transform-origin:center top;`;
	uiDiv.children[1].style = `float:right;transform:scale(${getScale(width, height)});transform-origin:right top;`;

	if (gameContainer.firstChild) {
		gameContainer.firstChild.style = `top:75%;margin:auto;position:absolute;font-size:${72*getScale(width, height)}px;right:${portrait?9:1}%`;
	}

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