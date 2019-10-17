// Handle logic of all keypresses
// (and maybe clicks on buttons for the help screens)

import { game } from '../index';

function handleKeyDown(e) {
  e.preventDefault();

  // Logic to handle direction of movement of player
  // Pressing an arrow key moves the player left or right
  // Any other keypress stops the player
  if (game.player) {
    switch (e.key) {
      case ('ArrowLeft' || 'Left'):
        // this.direction = -1;
        break;
      case ('ArrowRight' || 'Right'):
        // this.direction = 1;
        break;
      default:
        // this.direction = 0;
    }
  }

  // Handle interface controls
  // * This might get moved somewhere else *
  switch (e.key) {
    case 'p':
      // pause the game
      break;
    case 'a':
      // pause the game and open about screen
      break;
    case 'c':
      // pause the game and open controls screen
      break;
    case 't':
      // pause the game and open periodic table
      break;
    case 'r':
      // restart the game
      break;
    default:
      // return to the game
      break;
  }
};

function handleKeyUp(e) {
  e.preventDefault();

  // Will need to add logic to handle player currently moving
  if (game.player) {
    if (['ArrowLeft', 'Left'].includes(e.key)) {
      // stop the player
    }
    else if (['ArrowRight', 'Right'].includes(e.key)) {
      // stop the player
    }
    else {
      // stop the player???
    }
  }
}

// Somehow give these controls to the document