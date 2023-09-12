// SoundFX, sound effects
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
	
	// stage starting sound, w:length
	d.d = function(w,d) {
		playSound(90, 9, 10+w*10, 1, d||0, 0.05);
		playSound(30, 3, 20+w*10, 1, d||0, 0.1);
		playSound(90, 5, 20+w*10, 2, d||0, 0.2)
	}
	
	// 0:bunny die, 1-4:bunny jump
	d.b = function(w) {
		playSound(220, -9 * (w*w||1), 40/w|0||1, 2, w*60, .2 - (w?.14+w/80:0));
		playSound(90*(w||1), -9, 9, 1, w*60, .2 - (w?.14+w/80:0));
	}

	// level complete or super bunny jump
	d.c = function(w,l,d) {
		playSound(300-90*w*w, 9*w, (l||8)*w, 2-(w/2|0), (d||0)+(w-1)*(l/2||8), .1-w*.02);
	}
	
	// custom //_type, _freq, _incr, _length, _delay, _vol
	d.p = function(w,f,i,l,d,v){
		playSound(f||120, i||10, l||50, w||0, d, v||0.1);
	}
	
	return d;	
})();