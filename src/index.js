import './styles/index.scss';

window.addEventListener('DOMContentLoaded', () => {
  // document.getElementById('app').innerText = "Hello World!";
  document.getElementById('webpage');
});

const helpScreen = document.getElementById('help-screen');
const myCanvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const helpButton = document.getElementById('help-button');
const periodicButton = document.getElementById('periodic-button');

function handleHelp() {
  helpScreen.className = 'show';
  canvas.className = 'hide';
};

function returnToCanvas(e) {
  if (e.key === "Escape") {
    helpScreen.className = 'hide';
    canvas.className = 'show';
  }
};

helpButton.addEventListener('click', handleHelp);
window.addEventListener('keydown', returnToCanvas)

// Figuring out how to use event listeners on DOM elements
// helpButton.addEventListener('click', function() { alert("I clicked the help button"); });

