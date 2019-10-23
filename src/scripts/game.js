import Player from './player';
import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    // Things to draw on
    this.canvas = canvas;
    this.ctx = ctx;

    // Game status
    this.inProgress = false; // Game is either running or not
    this.paused = false; // Game may be inProgress but paused
    this.score = 0;
    this.animationFrameId = undefined;

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

    this.drawEntities = this.drawEntities.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.moveEntities = this.moveEntities.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Reset the game
  resetGame() {
    this.player = undefined;
    this.paused = false;
    this.atomArmy.length = 0;
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

      this.statUpdater = window.setInterval(this.updateStats, 100);
      window.requestAnimationFrame(this.renderGame);
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
    this.drawEntities();
    this.checkCollisions();
    this.moveEntities();

    console.log(this.player.health);
    if (this.player.isPlayerDefeated()) {
      this.gameOver();
    }

    this.animationFrameId = window.requestAnimationFrame(this.renderGame);
  }

  drawEntities() {
    this.player.draw();
    this.atomArmy.forEach((atom) => {
      atom.draw();
    });
  }

  checkCollisions() {
    collisionRectangleWall(this.canvas, this.player);
    this.atomArmy.forEach((atom) => {
      collisionCircleWall(this.canvas, atom);
      if (collisionCircleRectangle(atom, this.player)) {
        if (atom.nobleGas) {
          this.player.changePlayerStats('health', 5);
          this.atomArmy.splice(this.atomArmy.indexOf(atom), 1);
        }
        else {
          this.player.changePlayerStats('health', -5);
        }
      }
    });
  }

  moveEntities() {
    this.player.positionX += this.player.direction * this.player.dX;
    this.atomArmy.forEach((atom) => {
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    })
  }

  // Do some cleanup when game ends
  gameOver() {
    // debugger
    this.inProgress = false;
    this.atomArmy.length = 0;
    this.healthStat.innerHTML = this.player.health;
    window.removeEventListener('keydown', this.player.handleKeyPress);
    window.removeEventListener('keyup', this.player.handleKeyRelease);
    this.player = undefined;
    window.cancelAnimationFrame(this.animationFrameId);
    window.clearInterval(this.buildAtomArmy);
    window.clearInterval(this.statUpdater);
  }

  // dont' have to remove the player's eventListeners so that if game resets don't have to re-add them
  // if game over animate, else don't animate
  // on game over run fn to game.gameoverscreen

  // as long as game isn't over keep animating
  // string interpolate the player's health

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
    if (this.inProgress) {
      if (this.atomArmy.length >= 10) {
        return
      }
      this.atomArmy.push(generateAtom(this.canvas, this.ctx));
    }
  }
}