function handleHelpKeyDown(e) {
  e.preventDefault();
  switch (e.key) {
    case 'a':
      //
      break;
    case 'c':
      //
      break;
    case 't':
      //
      break;
    case 'Escape':
      //
      break;
    default:
      return;
  }
}

// const handlePlayerKeyDown = (e) => {
//   e.preventDefault();

//   switch (e.key) {
//     case ('ArrowLeft' || 'Left'):
//       this.player.direction = -1;
//       break;
//     case ('ArrowRight' || 'Right'):
//       this.player.direction = 1;
//       break;
//     default:
//       this.player.direction = 0;
//     }

//   this.player.positionX = this.player.positionX + (this.player.direction * this.player.dx);
//   if (this.player.positionX < 0) {
//     this.player.positionX = 0;
//   }
//   else if (this.player.positionX + this.width > this.canvas.width) {
//     this.player.positionX = this.canvas.width - this.width;
//   }
// }

// export const addPlayerControls = () => {
//   document.addEventListener('keydown', handleKeyDown);
// }