import Player from './player';
import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    // Things to draw on
    this.canvas = canvas;
    this.ctx = ctx;

    // Game status
    this.inProgress = false;
    this.paused = false;
    this.score = 0;

    // Current atoms being displayed
    this.atomArmy = [];
    
    this.healthStat = document.getElementById('health-stat');
    this.ammoStat = document.getElementById('ammo-stat');
    this.pointStat = document.getElementById('point-stat');

    this.newGame = this.newGame.bind(this);
    this.renderGame = this.renderGame.bind(this);
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
    this.inProgress = false;
  }

  // Begin a new game
  newGame(e) {
    if (e.type === 'click') {
      this.canvas.removeEventListener('click', this.newGame);
      this.resetGame();
      this.player = new Player(this.canvas, this.ctx);
      window.addEventListener('keydown', this.player.handleKeyPress);
      window.addEventListener('keyup', this.player.handleKeyRelease);
      this.inProgress = true;

      requestAnimationFrame(this.renderGame);
      this.statUpdater = window.setInterval(this.updateStats, 100);
      window.setInterval(this.buildAtomArmy, 2000);
    }
  }
  
  // Draw on the canvas
  renderGame() {
    if (this.paused) {
      window.clearInterval(this.generateAtom)
      return;
    }

    this.clearCanvas();

    this.player.draw();
    this.player.positionX += this.player.direction * this.player.dX;
    collisionRectangleWall(canvas, this.player);

    this.atomArmy.forEach((atom) => {
      atom.draw();
      collisionCircleWall(canvas, atom);
      if (collisionCircleRectangle(atom, this.player)) {
        if (atom.nobleGas) {
          this.player.changePlayerStats('health', 5);
          this.atomArmy.splice(this.atomArmy.indexOf(atom), 1);
        }
        else {
          this.player.changePlayerStats('health', -5);
        }
      }
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    });

    console.log(this.player.health);
    if (this.player.isPlayerDefeated()) {
      this.gameOver();
    }

    requestAnimationFrame(this.renderGame);
  }

  // Do some cleanup when game ends
  gameOver() {
    document.removeEventListener('keydown', this.player.handleKeyPress);
    document.removeEventListener('keyup', this.player.handleKeyRelease);
    cancelAnimationFrame(this.renderGame);
    window.clearInterval(this.statUpdater);
  }

  // Toggle pause
  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) {
      window.setInterval(this.updateStats, 100);
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