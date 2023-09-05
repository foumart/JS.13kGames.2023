// fullscreen functionality
let _fullscreen;

document.addEventListener("fullscreenchange", updateFullscreen);

function updateFullscreen() {
	_fullscreen = document.fullscreenElement;
	//...
}

// toggle fullscreen mode
function toggleFullscreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
}


// loader
function init() {
	updateFullscreen();
	initializeGame();
}

// FPS display
/*const times = [];
var fps;
function drawFPS() {
	const now = performance.now();
	while (times.length > 0 && times[0] <= now - 1000) {
		times.shift();
	}
	times.push(now);
	fps = times.length;

	gameContext.fillStyle = "#898";
	gameContext.fillRect(5,0,85,28)
	gameContext.font = "bold 20px Arial";
	gameContext.fillStyle = "#fff";
	gameContext.fillText("FPS: "+fps, 10, 21);
}*/
