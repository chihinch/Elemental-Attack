import Player from './player';
import Atom from './atom';

export default class Game {
  constructor(canvas, ctx) {
    // Things to draw on
    this.canvas = canvas;
    this.ctx = ctx;
    // this.player = new Player(this.canvas, this.ctx);

    // Game status
    this.paused = false;
    this.over = false;
    this.score = 0;

    // Entities being drawn
    this.entities = {};

    // Render the game
    this.renderGame = this.renderGame.bind(this);
  }

  renderGame() {
    // Return nothing if the game is paused
    if (this.paused) {
      return;
    }

    // Clear the canvas for the next frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Create a new player and start doing stuff?
  newGame() {
    this.player = new Player(this.canvas, this.ctx);
  }

  // Returns true if the player is defeated
  isGameOver() {
    return this.player.isPlayerDefeated();
  }

  // Will need some method to handle gameplay

}