export default class Control {
  constructor(game) {
    this.game = game;

    this.handleKeyDownPreGame = this.handleKeyDownPreGame.bind(this);
    this.handleKeyDownInGame = this.handleKeyDownInGame.bind(this);
    this.handleKeyUpInGame = this.handleKeyUpInGame.bind(this); 
    this.handleKeyDownPostGame = this.handleKeyDownPostGame.bind(this);
  }

  addKeyDownPreGameListener() {
    document.addEventListener('keydown', this.handleKeyDownPreGame);
  }

  removeKeyDownPreGameListener() {
    document.removeEventListener('keydown', this.handleKeyDownPreGame);
  }

  addKeyDownInGameListener() {
    document.addEventListener('keydown', this.handleKeyDownInGame);
  }

  removeKeyDownInGameListener() {
    document.removeEventListener('keydown', this.handleKeyDownInGame);
  }

  addKeyUpInGameListener() {
    document.addEventListener('keyup', this.handleKeyUpInGame);
  }
  
  removeKeyUpInGameListener() {
    document.removeEventListener('keyup', this.handleKeyUpInGame);
  }

  addKeyDownPostGameListener() {
    document.addEventListener('keydown', this.handleKeyDownPostGame);
  }

  removeKeyDownPostGameListener() {
    document.removeEventListener('keydown', this.handleKeyDownPostGame);
  }

  handleKeyDownPreGame(event) {
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
        if (this.game.slideshow.controlSeen) {
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

  handleKeyUpInGame(event) {
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

  handleKeyDownPostGame(event) {
    switch(event.key) {
      case ' ':
        this.game.newGame();
        break;
      default:
        return;
    }
  }
};