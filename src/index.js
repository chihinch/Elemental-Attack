import './styles/index.scss';

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('webpage');
});


// Get the divs holding instructions and the periodic table
const instructionScreen = document.getElementById('instruction-screen');
const periodicTable = document.getElementById('periodic-table');


// Get the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// const helpButton = document.getElementById('help-button');
// const periodicButton = document.getElementById('periodic-button');


// Add event listeners to the help buttons
const helpButtons = document.getElementsByClassName('help-button');
for (let i = 0; i < helpButtons.length; i++) {
  helpButtons[i].addEventListener('click', handleHelpButton, false);
}

function handleHelpButton(e) {
  debugger
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

function returnToCanvas() {
  // if (e.key === "Escape") {
    instructionScreen.className = 'hide';
    periodicTable.className = 'hide';
    canvas.className = 'show';
  // }
};

function handleKeyPress(e) {
  if (e.key === "Escape") {
    returnToCanvas();
  }
}

// helpButton.addEventListener('click', handleHelp);
window.addEventListener('keydown', handleKeyPress)

// Figuring out how to use event listeners on DOM elements
// helpButton.addEventListener('click', function() { alert("I clicked the help button"); });

