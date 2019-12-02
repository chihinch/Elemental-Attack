export default class Control {
  constructor(game) {
    this.game = game;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this); 
  }

  addKeyDownListener() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  removeKeyDownListener() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  
  addKeyUpListener() {
    document.addEventListener('keyup', this.handleKeyUp);
  }
  
  removeKeyUpListener() {
    document.removeEventListener('keyup', this.handleKeyUp);
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

  handleKeyUp(event) {
    switch(event.key) {
      case 'ArrowLeft':
        this.game.player.direction = 0;
        break;
      case 'Left':
        this.game.player.direction = 0;
        break;
      case 'ArrowRight':
        this.game.player.direction = 0;
        break;
      case 'Right':
        this.game.player.direction = 0;
        break;
      default:
        return;
    }
  }
}