// start a new set, pick the first colour, add to simonSaid array
function OscillatorTone(freq) {
    this.isPlaying = false;
    this.type = 'square';
    let context = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = context.createOscillator();
    this.oscillator.frequency.value = freq;
    this.oscillator.type = 'square';
}

OscillatorTone.prototype.play = function () {
    // Create some sweet sweet nodes.

    console.log('start');
    // Setup the graph.
    this.oscillator[this.oscillator.start ? 'start' : 'noteOn'](0);
};

OscillatorTone.prototype.stop = function () {
    console.log('stop');
    this.oscillator.stop(0);
};

OscillatorTone.prototype.toggle = function () {
    console.log('toggle')
    (this.isPlaying ? this.stop() : this.play());
    this.isPlaying = !this.isPlaying;

};

OscillatorTone.prototype.changeFrequency = function (val) {
    this.oscillator.frequency.value = val;
};

OscillatorTone.prototype.changeDetune = function (val) {
    this.oscillator.detune.value = val;
};

OscillatorTone.prototype.changeType = function (type) {
    this.oscillator.type = type;
};