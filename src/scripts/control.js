// // Handle logic of all keypresses
// // (and maybe clicks on buttons for the help screens)

// function handleKeyDown(e, game) {
//   e.preventDefault();

//   // Logic to handle direction of movement of player
//   // Pressing an arrow key moves the player left or right
//   // Any other keypress stops the player
//   if (game.player) {
//     switch (e.key) {
//       case ('ArrowLeft' || 'Left'):
//         // this.direction = -1;
//         break;
//       case ('ArrowRight' || 'Right'):
//         // this.direction = 1;
//         break;
//       default:
//         // this.direction = 0;
//     }
//   }

//   // Handle interface controls
//   // * This might get moved somewhere else *
//   switch (e.key) {
//     case 'p':
//       // pause the game
//       break;
//     case 'r':
//       // restart the game
//       break;
//     default:
//       // return to the game
//       break;
//   }
// };

// function handleKeyUp(e, game) {
//   e.preventDefault();

//   // Will need to add logic to handle player currently moving
//   if (game.player) {
//     if (['ArrowLeft', 'Left'].includes(e.key)) {
//       // stop the player
//     }
//     else if (['ArrowRight', 'Right'].includes(e.key)) {
//       // stop the player
//     }
//     else {
//       // stop the player???
//     }
//   }
// }

// // Somehow give these controls to the document
// export const addGameControls = (game) => {
//   document.addEventListener('keydown', handleKeyDown);
//   document.addEventListener('keyup', handleKeyUp);
//   // document.addEventListener('keydown', handleKeyDown);
// };

// export const removeGameControls = () => {
//   document.removeEventListener('keydown', handleKeyDown);
//   document.removeEventListener('keyup', handleKeyUp);
// };

// export default class PlayerControls {
//   constructor(game) {
//     this.game = game;
//   }

//   handleKeyDown(e) {
//     e.preventDefault();

//     switch (e.key) {
//       case ('ArrowLeft' || 'Left'):
//         this.game.player.direction = -1;
//         break;
//       case ('ArrowRight' || 'Right'):
//         this.game.player.direction = 1;
//         break;
//       default:
//         this.game.player.direction = 0;
//     }
//   }
// }

const handlePlayerKeyDown = (e) => {
  e.preventDefault();

  switch (e.key) {
    case ('ArrowLeft' || 'Left'):
      this.player.direction = -1;
      break;
    case ('ArrowRight' || 'Right'):
      this.player.direction = 1;
      break;
    default:
      this.player.direction = 0;
    }

  this.player.positionX = this.player.positionX + (this.player.direction * this.player.dx);
  if (this.player.positionX < 0) {
    this.player.positionX = 0;
  }
  else if (this.player.positionX + this.width > this.canvas.width) {
    this.player.positionX = this.canvas.width - this.width;
  }
}

// export const addPlayerControls = () => {
//   document.addEventListener('keydown', handleKeyDown);
// }