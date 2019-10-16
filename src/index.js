import './styles/index.css';
import Player from './scripts/player';
import Atom from './scripts/atom';
// import PeriodicTableData from 'periodic-table';
import * as PeriodicTableData from 'periodic-table';

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('webpage');
});

// const periodicTableData = require('periodic-table');

// Get the divs holding instructions and the periodic table
const instructionsScreen = document.getElementById('instructions-screen');
const controlsScreen = document.getElementById('controls-screen');
const periodicTableScreen = document.getElementById('periodic-table');

const gameDivs = document.getElementById('game').children;

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
};

// Return to the game
function returnToCanvas() {
    instructionsScreen.className = 'hide';
    controlsScreen.className = 'hide';
    periodicTableScreen.className = 'hide';
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

// const elementId = Math.floor(Math.random() * 83);
// const element = periodicTableData.numbers[elementId];

// const testAtom = new Atom(canvas, ctx, element.cpkHexColor, element.atomicNumber, element.symbol, element.atomicRadius, element.atomicMass, oxidationState);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.drawPlayer();
}

// Update player stats
const healthStat = document.getElementById('health-stat');
const ammoStat = document.getElementById('ammo-stat');
const pointStat = document.getElementById('point-stat');

function updateStats() {
  healthStat.innerHTML = player.getHealth();
  ammoStat.innerHTML = player.getAmmo();
  pointStat.innerHTML = player.getPoints();
}

setInterval(draw, 10);
setInterval(updateStats, 1500);

