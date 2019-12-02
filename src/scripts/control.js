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
      default:
        return;
    }
  }
}