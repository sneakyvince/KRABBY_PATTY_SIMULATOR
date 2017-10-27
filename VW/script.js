$('<audio id="chatAudio"> <source src="audio/Ping.mp3" type="audio/mpeg"></audio>').appendTo('body');

try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch (e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}

var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');
var krabbyArray = ["bread", "sesame", "hamburger", "lettuce", "cheese", "onion"];


/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-GB";

recognition.onstart = function () {
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function () {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function (event) {
  if (event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
  };
}


/*-----------------------------
      App buttons and input 
------------------------------*/

$('#start-record-btn').on('click', function (e) {
  recognition.onresult = function () {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    // Log the result for debugging purposes.
    console.log(transcript);

    if (transcript.indexOf(krabbyArray[0]) >= 0) {
      document.getElementById("bread").style.visibility = "visible";
      $('#chatAudio')[0].play();
      $('#bread').addClass('magictime slideLeftReturn');
    }

    if (transcript.indexOf(krabbyArray[1]) >= 0) {
      document.getElementById("sesame").style.visibility = "visible";
      $('#chatAudio')[0].play();
      $('#sesame').addClass('magictime vanishIn');
    }

    if (transcript.indexOf(krabbyArray[2]) >= 0) {
      document.getElementById("meat").style.visibility = "visible";
      $('#chatAudio')[0].play();
      $('#meat').addClass('magictime slideLeftReturn');
    }

    if (transcript.indexOf(krabbyArray[3]) >= 0) {
      document.getElementById("lettuce").style.visibility = "visible";
      $('#chatAudio')[0].play();
      $('#lettuce').addClass('magictime slideLeftReturn');
    }

    if (transcript.indexOf(krabbyArray[4]) >= 0) {
      document.getElementById("cheese").style.visibility = "visible";

      setTimeout(function(){
        document.getElementById("melting-cheese").style.visibility = "visible";
      }, 2000);
      
      $('#chatAudio')[0].play();
      $('#cheese').addClass('magictime slideLeftReturn');
    }

    if (transcript.indexOf(krabbyArray[5]) >= 0) {
      document.getElementById("onion").style.visibility = "visible";
      $('#chatAudio')[0].play();
      $('#onion').addClass('magictime slideLeftReturn');
    }

  }

  recognition.start();
});


$('#pause-record-btn').on('click', function (e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});