import Player from './player';
import Atom from './atom';

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

    // Render the game
    this.renderGame = this.renderGame.bind(this);

    // Start the game
    this.newGame = this.newGame.bind(this);
  }

  // Draw on the canvas
  renderGame() {
    // Return nothing if the game is paused
    if (this.paused) {
      return;
    }

    // Clear the canvas for the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Reset the game
  resetGame() {
    this.entities = {};
    this.score = 0;
  }

  // Begin a new game
  newGame() {
    this.canvas.removeEventListener('click', this.newGame());
    this.canvas.removeEventListener('keydown', this.newGame());

    this.player = new Player(this.canvas, this.ctx);
  }

  // Returns true if the player is defeated
  isGameOver() {
    return this.player.isPlayerDefeated();
  }

  // Will need some method to handle gameplay

}