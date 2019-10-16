import './styles/index.scss';
import Player from './scripts/player';

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('webpage');
});

// Get the divs holding instructions and the periodic table
const instructionsScreen = document.getElementById('instructions-screen');
const controlsScreen = document.getElementById('controls-screen');
const periodicTable = document.getElementById('periodic-table');

const gameDivs = document.getElementById('game').children;
console.log(gameDivs);

// Get the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 480;

const player = new Player(canvas, ctx);

// Add event listeners to the help buttons
const helpButtons = document.getElementsByClassName('help-button');
for (let i = 0; i < helpButtons.length; i++) {
  helpButtons[i].addEventListener('click', handleHelpButton, false);
}

// Upon pressing one of the help buttons, show the relevant display
function handleHelpButton(e) {
  let showDivId;
  switch (e.target.id) {
    case 'about-button':
      showDivId = 'instructions-screen';
      break;
    case 'controls-button':
      showDivId = 'controls-screen';
      break;
    case 'periodic-button':
      showDivId = 'periodic-table';
      break;
    default:
      showDivId = 'canvas';
  }

  for (let i = 0; i < gameDivs.length; i++ ) {
    if (gameDivs[i].id === showDivId) {
      gameDivs[i].className = 'show';
    }
    else {
      gameDivs[i].className = 'hide';
    }
  }
  // if (e.target.id === 'instruction-button') {
  //   instructionScreen.className = 'show';
  //   periodicTable.className = 'hide';
  //   canvas.className = 'hide';
  // } 
  // else if (e.target.id ===)
  // else if (e.target.id === 'periodic-button') {
  //   instructionScreen.className = 'hide';
  //   periodicTable.className = 'show';
  //   canvas.className = 'hide';
  // } 
  // else {
  //   returnToCanvas();
  // }

  // switch (e.target.id) {
  //   case 'instruction-button'
  // }
};

// Return to the game
function returnToCanvas() {
    instructionsScreen.className = 'hide';
    controlsScreen.className = 'hide';
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

setInterval(draw, 10);

// Figuring out how to use event listeners on DOM elements
// helpButton.addEventListener('click', function() { alert("I clicked the help button"); });

