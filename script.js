// script.js
// Check for browser support
const startStopBtn = document.getElementById('startStopBtn');
const output = document.getElementById('output');
const status = document.getElementById('status');
const microphoneIcon = document.getElementById('microphoneIcon'); // Reference to the microphone icon

let isListening = false;
let recognition;

// Check if the browser supports SpeechRecognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  // Use SpeechRecognition API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.continuous = true; // Continue recognition even after pauses
  recognition.interimResults = true; // Show partial results

  // When speech is recognized
  recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    output.value = transcript;
  };

  // Handle recognition errors
  recognition.onerror = function(event) {
    console.error("Speech recognition error", event.error);
    status.innerHTML = "Error: " + event.error;
  };

  // Update the status when recognition starts or stops
  recognition.onstart = function() {
    status.innerHTML = "Status: Listening";  // Change status to "Listening"
    microphoneIcon.classList.remove('fa-microphone');
    microphoneIcon.classList.add('fa-microphone-alt'); // Change to a listening icon
  };

  recognition.onend = function() {
    status.innerHTML = "Status: Not Listening";  // Change status to "Not Listening"
    startStopBtn.textContent = "Start Listening"; // Button text updates
    microphoneIcon.classList.remove('fa-microphone-alt');
    microphoneIcon.classList.add('fa-microphone'); // Change back to normal microphone icon
  };

  // Toggle start and stop functionality
  startStopBtn.addEventListener('click', function() {
    if (isListening) {
      recognition.stop();
      isListening = false;
      startStopBtn.textContent = "Start Listening";
    } else {
      recognition.start();
      isListening = true;
      startStopBtn.textContent = "Stop Listening";
    }
  });
} else {
  // If the browser does not support SpeechRecognition
  status.innerHTML = "Your browser does not support speech recognition.";
}
