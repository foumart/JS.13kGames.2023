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
