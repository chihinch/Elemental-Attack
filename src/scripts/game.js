import Player from './player';
import Atom from './atom';
// may need to import controls

export default class Game {
  constructor(canvas, ctx) {
    // Things to draw on
    this.canvas = canvas;
    this.ctx = ctx;

    // Game status
    this.paused = false;
    this.over = false;
    this.score = 0;

    // Entities (the player and the atom) being drawn
    this.entities = {};

    this.newGame = this.newGame.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.healthStat = document.getElementById('health-stat');
    this.ammoStat = document.getElementById('ammo-stat');
    this.pointStat = document.getElementById('point-stat');

    this.updateStats = this.updateStats.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Draw on the canvas
  renderGame() {
    // Return nothing if the game is paused
    if (this.paused) {
      return;
    }

    this.clearCanvas();
  }

  // Reset the game
  resetGame() {
    this.entities = {};
    this.score = 0;
  }

  // Begin a new game
  newGame(e) {
    // debugger
    if (e.type === 'click') {
      // debugger
      // this.canvas.removeEventListener('click', this.newGame());
      this.resetGame();
      this.player = new Player(this.canvas, this.ctx);
      this.entities = Object.assign({}, this.entities, this.player);
      debugger
      this.statUpdater = window.setInterval(this.updateStats, 1000);
    }
  }

  // Returns true if the player is defeated
  isGameOver() {
    return this.player.isPlayerDefeated();
  }

  gameOver() {
    window.clearInterval(this.statUpdater);
  }

  // Toggle pause
  togglePause() {
    this.paused = !this.paused;
  }

  // Will need some method to handle gameplay

  // Update stats shown on screen
  updateStats() {
  // debugger
  this.healthStat.innerHTML = this.player.health;
  this.ammoStat.innerHTML = this.player.electrons;
  this.pointStat.innerHTML = this.score;
  }

}