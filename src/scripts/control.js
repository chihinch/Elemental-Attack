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