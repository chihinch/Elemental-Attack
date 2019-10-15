import './styles/index.scss';
import Player from './scripts/player';

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('webpage');
});

// Get the divs holding instructions and the periodic table
const instructionScreen = document.getElementById('instruction-screen');
const periodicTable = document.getElementById('periodic-table');

// Get the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

const player = new Player(canvas, ctx);

// Add event listeners to the help buttons
const helpButtons = document.getElementsByClassName('help-button');
for (let i = 0; i < helpButtons.length; i++) {
  helpButtons[i].addEventListener('click', handleHelpButton, false);
}

// Upon pressing one of the help buttons, show the relevant display
function handleHelpButton(e) {
  if (e.target.id === 'instruction-button') {
    instructionScreen.className = 'show';
    periodicTable.className = 'hide';
    canvas.className = 'hide';
  } else if (e.target.id === 'periodic-button') {
    instructionScreen.className = 'hide';
    periodicTable.className = 'show';
    canvas.className = 'hide';
  } else {
    returnToCanvas();
  }
};

// Return to the game
function returnToCanvas() {
    instructionScreen.className = 'hide';
    periodicTable.className = 'hide';
    canvas.className = 'show';
};

// Press esc to return to the game
function handleKeyPress(e) {
  if (e.key === "Escape") {
    returnToCanvas();
  } else {
    player.handleKeyPress(e);
  }
}

function handleKeyRelease(e) {
  player.handleKeyRelease(e);
}

window.addEventListener('keydown', handleKeyPress, false);
window.addEventListener('keyup', handleKeyRelease, false);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer();
}

setInterval(draw, 5);

// Figuring out how to use event listeners on DOM elements
// helpButton.addEventListener('click', function() { alert("I clicked the help button"); });

