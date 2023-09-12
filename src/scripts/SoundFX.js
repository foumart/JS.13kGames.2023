var SoundFX = (function() {
	var audioContext;
	var oscTypes = ["sawtooth", "square", "triangle", "sine"];
	var initialized;
	// start frequency HZ
	// frequency change in time + / -
	// length (number of frames taking to play the sound)
	// oscillator type 0 - 3
	// starting delay (milliseconds of timeout before the sound starts)
	// volume 0.0 - 1.0
	function playSound(_freq, _incr, _length, _type, _delay, _vol) {
		
		if (!audioContext) return;
		
		var oscillator = audioContext.createOscillator(); // instantiate a new oscillator
		oscillator.type = oscTypes[_type];
		
		var modulationGain = audioContext.createGain(); // instantiate modulation for sound volume control
		modulationGain.gain.value = 0; // set the initial volume to 0 to prevent an ugly tick noise at the beginning

		var i = 0;// frame counter
		if (_delay) setTimeout(playTune, _delay); else playTune();
		
		function playTune(){
			if (!_vol) return;
			if (!i) {
				oscillator.connect(modulationGain).connect(audioContext.destination);
				oscillator.start();
				// make sure to stop the sound from playing in the background (when the tab is inactive)
				oscillator.stop(audioContext.currentTime+(_length-i)/60);
			} else modulationGain.gain.value = (i<4?.05*i*i:1-i/_length) * _vol * d.volume;
			oscillator.frequency.value = _freq + _incr * i;
			if (i++ < _length) requestAnimationFrame(playTune);
		}
	}

	var d = {volume:1, initialized:initialized, start:function(){
		try {
			audioContext = new (
				window.AudioContext ||
				window.webkitAudioContext ||
				window.mozAudioContext ||
				window.msAudioContext ||
				window.oAudioContext
			)();
			this.initialized = 1;
			console.log("[Event] AudioContext initialized");
		} catch(e){
			console.log("[Warning] AudioContext not found",e);
		}
	}}

	// level complete sounds
	d.c = function(w, l, d) {
		playSound(300-90*w*w, 9*w, (l||12)*w, 2-(w/2|0), (d||0)+(w-1)*(l/2||8), .5-w*.1);
	}

	// custom //_type, _freq, _incr, _length, _delay, _vol
	d.p = function(w, f, i, l, d, v){
		playSound(f||120, i||10, l||50, w||0, d, v||0.5);
	}
	
	return d;	
})();



// sounds taken from super bunny:
//SoundFX.b(0);// bruh
//SoundFX.b(1);// tiuu (heavy)
//SoundFX.b(3);// iu (pitched)
//SoundFX.b(4);// iu (more pitched)

//SoundFX.c(2);// pui
//SoundFX.c(3);// piuu
//SoundFX.c(4);// piiuuu (high pitch)

//SoundFX.d(6,90)// next level
//SoundFX.d(0)// buim

//SoundFX.p(2, 200, -10);//bioui (distant)
//SoundFX.d(9,90)// next level 2

//SoundFX.d(2,90)// tuuiii
//SoundFX.c(2,9);//tui

//SoundFX.c(4);// piiuuu (very high pich /jump)
//SoundFX.p(1, 90, -20, 20);// ui short
//SoundFX.p(1, 9, 40, 20);//tui (take sound?)

// multitone tuuii (achievement?)
//SoundFX.p(1, 50, 10, 40);
//SoundFX.p(1, 90, 8, 35, 160, .05);
//SoundFX.p(0, 90, 20, 30, 320, .06);

// multitone effect
//SoundFX.p(0, -900, 45, 50, 0, .04);
//SoundFX.p(1, -200, 15, 50);
//SoundFX.p(2, 0, 9, 40, 250);
//SoundFX.p(1, 20, 20, 30, 300);

// multitone effect teleport/magic ?
//SoundFX.c(1, 20, 900)
//SoundFX.c(2, 20, 900)
//SoundFX.c(3, 20, 900)
//SoundFX.c(4, 20, 900)