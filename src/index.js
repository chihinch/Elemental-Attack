import './styles/index.css';
import Game from './scripts/game';

window.addEventListener('DOMContentLoaded', () => {
  const webpage = document.getElementById('webpage');
  
  // Get the divs holding help screens and the periodic table
  const gameDivs = document.getElementById('game').children;

  // Add event listeners to the help buttons
  const helpButtons = document.getElementsByClassName('help-button');
  for (let i = 0; i < helpButtons.length; i++) {
    helpButtons[i].addEventListener('click', handleHelpButton, false);
  }

  // Get the canvas
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 480;

  // Instantiate a new game
  const game = new Game(canvas, ctx);

  // Add event listener to start the game
  canvas.addEventListener('click', game.newGame());

  // Add event listeners for toggling betweens displays
  document.addEventListener('keydown', handleKeyDown);

  // Upon pressing one of the help buttons, pause the game and show the relevant screen
  function handleHelpButton(e) {
    game.togglePause();
    let showDivId;
    let target;
    if (e.type === 'click') {
      target = e.target.id;
    } else {
      switch (e.key) {
        case 'a':
          target = 'about-button';
          break;
        case 'c':
          target = 'controls-button';
          break;
        case 'p':
          target = 'periodic-button';
          break;
        default:
          target = undefined;
      }
    }

    switch (target) {
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

    for (let i = 0; i < gameDivs.length; i++) {
      if (gameDivs[i].id === showDivId) {
        gameDivs[i].className = 'show';
      }
      else {
        gameDivs[i].className = 'hide';
      }
    }
  };

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      leaveHelpScreen();
    } 
    else {
      handleHelpButton(e);
    }
  };

  // Return to the game and resume
  function leaveHelpScreen() {
    for (let i = 0; i < gameDivs.length; i++) {
      if (gameDivs[i].id === 'canvas') {
        gameDivs[i].className = 'show';
      }
      else {
        gameDivs[i].className = 'hide';
      }
    }
    game.togglePause();
  }
});

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

