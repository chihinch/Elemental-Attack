import Player from './player';
import { collisionCircleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    // Things to draw on
    this.canvas = canvas;
    this.ctx = ctx;

    // Game status
    this.paused = false;
    this.score = 0;

    // Current atoms being displayed
    this.atomArmy = [];
    
    this.healthStat = document.getElementById('health-stat');
    this.ammoStat = document.getElementById('ammo-stat');
    this.pointStat = document.getElementById('point-stat');

    this.newGame = this.newGame.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.buildAtomArmy = this.buildAtomArmy.bind(this);
    this.updateStats = this.updateStats.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Reset the game
  resetGame() {
    this.entities = [];
    this.player = undefined;
    this.score = 0;
  }

  // Begin a new game
  newGame(e) {
    if (e.type === 'click') {
      this.canvas.removeEventListener('click', this.newGame);
      this.resetGame();
      this.player = new Player(this.canvas, this.ctx);
      window.addEventListener('keydown', this.player.handleKeyPress);
      this.statUpdater = window.setInterval(this.updateStats, 500);
      
      // window.setInterval(this.renderGame, 20);
      requestAnimationFrame(this.renderGame);
      window.setInterval(this.buildAtomArmy, 2000);
    }
  }
  
  // Draw on the canvas
  renderGame() {
    // Return nothing if the game is paused
    if (this.paused) {
      window.clearInterval(this.generateAtom)
      return;
    }

    this.clearCanvas();
    this.player.draw();

    this.atomArmy.forEach((atom) => {
      atom.draw();
      collisionCircleWall(canvas, atom);
      if (collisionCircleRectangle(atom, this.player)) {
        console.log('ouch');
        this.player.health -= 1;
      }
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    });

    if (this.isGameOver()) {
      this.gameOver();
    }

    requestAnimationFrame(this.renderGame);
  }

  // Returns true if the player is defeated
  isGameOver() {
    return this.player.isPlayerDefeated();
  }

  // Do some cleanup when game ends
  gameOver() {
    document.removeEventListener('keydown', this.player.handleKeyPress);
    window.clearInterval(this.statUpdater);
    window.clearInterval(this.renderGame);
  }

  // Toggle pause
  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.renderGame();
    }
  }

  // Update stats shown on screen
  updateStats() {
  this.healthStat.innerHTML = this.player.health;
  this.ammoStat.innerHTML = this.player.electrons;
  this.pointStat.innerHTML = this.score;
  }

  buildAtomArmy() {
    if (this.atomArmy.length >= 10) {
      return
    }
    this.atomArmy.push(generateAtom(this.canvas, this.ctx));
  }
}