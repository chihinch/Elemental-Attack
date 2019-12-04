export default class Control {
  constructor(game) {
    this.game = game;

    this.handleKeyDownOutsideGame = this.handleKeyDownOutsideGame.bind(this);
    this.handleKeyDownInGame = this.handleKeyDownInGame.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this); 
  }

  addKeyDownOutsideGameListener() {
    document.addEventListener('keydown', this.handleKeyDownOutsideGame);
  }

  addKeyDownInGameListener() {
    document.addEventListener('keydown', this.handleKeyDownInGame);
  }

  removeKeyDownOutsideGameListener() {
    document.removeEventListener('keydown', this.handleKeyDownOutsideGame);
  }

  removeKeyDownInGameListener() {
    document.removeEventListener('keydown', this.handleKeyDownInGame);
  }

  addKeyUpListener() {
    document.addEventListener('keyup', this.handleKeyUp);
  }
  
  removeKeyUpListener() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDownOutsideGame(event) {
    switch(event.key) {
      case 'ArrowLeft':
        this.game.slideshow.backwardSlide();
        break;
      case 'Left':
        this.game.slideshow.backwardSlide();
        break;
      case 'ArrowRight':
        this.game.slideshow.advanceSlide();
        break;
      case 'Right':
        this.game.slideshow.advanceSlide();
        break;
      case ' ':
        if (this.game.slideshow.allowGameStart) {
          this.game.newGame();
        }
        break;
      default:
        return;
    }
  }

  handleKeyDownInGame(event) {
    switch (event.key) {
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
};