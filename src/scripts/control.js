export default class Control {
  constructor(game) {
    this.game = game;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  addKeyDownListener() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  removeKeyDownListener() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    switch (event.key) {
      case ' ':
        this.game.newGame();
        break;
      case 'p':
        this.game.togglePause();
        break;
      case 'z':
        this.game.player.fireWeapon('ioniser');
        break;
      case 'x':
        this.game.player.fireWeapon('electron');
        break;
      case 'ArrowLeft':
        this.game.player.direction = -1;
        break;
      case 'Left':
        this.game.player.direction = -1;
        break;
      case 'ArrowRight':
        this.game.player.direction = 1;
        break;
      case 'Right':
        this.game.player.direction = 1;
        break;
      default:
        return;
    }
  }
}