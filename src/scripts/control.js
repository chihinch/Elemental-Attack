// const addKeyDownListener = (game) => {
//   // document.addEventListener('keydown', handleKeyDown);
//   document.addEventListener('keydown', function() { 
//     handleKeyDown(game); 
//   });
// };

// const handleKeyDown = (event, game) => {
//   // console.log(arguments);
//   console.log(event);
//   console.log(game);
//   // switch (event.key) {
//   //   case 'p':
//   //     console.log('p')
//   //     game.togglePause();
//   //   default:
//   //     return;
//   // }
// };

// export { addKeyDownListener, handleKeyDown };

class Control {
  constructor(game) {
    this.game = game;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  addKeyDownListener() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    switch (event.key) {
      case ' ':
        this.game.newGame();
        break;
      default:
        return;
    }
  }
}

export default Control;