var audioCtx;

function initAudio() {
    // create web audio api context
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();
}

async function playNote(frequency, duration) {
    // create Oscillator node
    var oscillator = audioCtx.createOscillator();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency; // value in hertz
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.05;
    gainNode.connect(audioCtx.destination);
    //oscillator.connect(audioCtx.destination);
    oscillator.connect(gainNode);
    oscillator.start();

    setTimeout(
        function() {
            oscillator.stop();
        }, 
    duration);
}