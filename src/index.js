import './styles/index.css';
import Player from './scripts/player';
import Atom from './scripts/atom';
import Game from './scripts/game';

window.addEventListener('DOMContentLoaded', () => {
  const webpage = document.getElementById('webpage');
  
  // Get the divs holding help screens and the periodic table
  const instructionsScreen = document.getElementById('instructions-screen');
  const controlsScreen = document.getElementById('controls-screen');
  const periodicTableScreen = document.getElementById('periodic-table');

  const gameDivs = document.getElementById('game').children;

  // Get the canvas
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 480;

  // Instantiate a new game
  const game = new Game(canvas, ctx);

  canvas.addEventListener('click', game.newGame());
  canvas.addEventListener('keydown', game.newGame());

});







// const periodicTableData = require('./assets/data/periodicTable');

// // Get the divs holding instructions and the periodic table
// const instructionsScreen = document.getElementById('instructions-screen');
// const controlsScreen = document.getElementById('controls-screen');
// const periodicTableScreen = document.getElementById('periodic-table');

// const gameDivs = document.getElementById('game').children;

// // Get the canvas
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// canvas.width = 800;
// canvas.height = 480;

// const player = new Player(canvas, ctx);

// // Add event listeners to the help buttons
// const helpButtons = document.getElementsByClassName('help-button');
// for (let i = 0; i < helpButtons.length; i++) {
//   helpButtons[i].addEventListener('click', handleHelpButton, false);
// }

// // Upon pressing one of the help buttons, show the relevant display
// function handleHelpButton(e) {
//   let showDivId;
//   switch (e.target.id) {
//     case 'about-button':
//       showDivId = 'instructions-screen';
//       break;
//     case 'controls-button':
//       showDivId = 'controls-screen';
//       break;
//     case 'periodic-button':
//       showDivId = 'periodic-table';
//       break;
//     default:
//       showDivId = 'canvas';
//   }

//   for (let i = 0; i < gameDivs.length; i++ ) {
//     if (gameDivs[i].id === showDivId) {
//       gameDivs[i].className = 'show';
//     }
//     else {
//       gameDivs[i].className = 'hide';
//     }
//   }
// };

// // Return to the game
// function returnToCanvas() {
//     instructionsScreen.className = 'hide';
//     controlsScreen.className = 'hide';
//     periodicTableScreen.className = 'hide';
//     canvas.className = 'show';
// };

// // Press esc to return to the game
// function handleKeyPress(e) {
//   if (e.key === "Escape") {
//     returnToCanvas();
//   } else {
//     player.handleKeyPress(e);
//   }
// }

// function handleKeyRelease(e) {
//   player.handleKeyRelease(e);
// }

// window.addEventListener('keydown', handleKeyPress, false);
// window.addEventListener('keyup', handleKeyRelease, false);

// const elementId = Math.floor(Math.random() * 83);
// const element = periodicTableData.numbers[elementId];
// debugger
// let oxidationState;
// if (typeof element.oxidationStates === 'number') {
//   oxidationState = element.oxidationStates;
// }
// else {
//   const oxStates = element.oxidationStates.split(", ");
//   debugger
//   if (element.electronegativity >= 2.50) {
//     oxidationState = parseInt(elementStates[oxStates.length - 1]);
//   } 
//   else {
//     oxidationState = parseInt(oxStates[0]);
//   }
// }
// debugger

// const testAtom = new Atom(canvas, ctx, element.cpkHexColor, element.symbol, element.atomicRadius, element.atomicMass, oxidationState);
// debugger

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   player.drawPlayer();
//   testAtom.drawAtom();

//   testAtom.positionX = testAtom.positionX + testAtom.dX;
//   testAtom.positionY = testAtom.positionY + testAtom.dY;
// }

// // Update player stats
// const healthStat = document.getElementById('health-stat');
// const ammoStat = document.getElementById('ammo-stat');
// const pointStat = document.getElementById('point-stat');

// function updateStats() {
//   healthStat.innerHTML = player.getHealth();
//   ammoStat.innerHTML = player.getAmmo();
//   pointStat.innerHTML = player.getPoints();
// }

// setInterval(draw, 10);
// setInterval(updateStats, 1500);

