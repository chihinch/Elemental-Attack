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
  canvas.addEventListener('click', game.newGame);

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
        case 't':
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