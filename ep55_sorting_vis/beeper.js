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
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    setTimeout(
        function() {
            oscillator.stop();
        }, 
    duration);
}