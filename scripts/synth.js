var keyboard = new QwertyHancock({
  id: 'keyboard',
  width: 600,
  height: 150,
  octave: 2
});

var context = new AudioContext(),
  masterVolume = context.createGain();

masterVolume.gain.volume = 0.3;
masterVolume.connect(context.destination);


var oscillators = {};

keyboard.keyDown = function(note, frequency){
  var osc = context.createOscillator();
  var osc2 = context.createOscillator();

  osc.type = 'square';
  osc.frequency.value = frequency;

  osc2.type = 'sawtooth';
  osc2.frequency.value = frequency;

  osc.detune.value = 10;
  osc2.detune.value = -10;


  oscillators[frequency] = [osc, osc2];

  osc.connect(context.destination);
  osc2.connect(context.destination);

  masterVolume.connect(context.destination);

  osc.start(context.currentTime);
  osc2.start(context.currentTime);
};

keyboard.keyUp = function( note, frequency){
  oscillators[frequency].forEach(function (oscillator){ oscillator.stop(context.currentTime);
  });
};



