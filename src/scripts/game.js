import Player from './player';
import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.inProgress = false; // Game is either running or not
    this.paused = false; // Game may be inProgress but paused
    this.score = 0;
    this.animationFrameId = undefined;

    this.atomArmy = [];
    
    this.healthStat = document.getElementById('health-stat');
    this.ammoStat = document.getElementById('ammo-stat');
    this.pointStat = document.getElementById('point-stat');

    this.resetGame = this.resetGame.bind(this);
    this.newGame = this.newGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.buildAtomArmy = this.buildAtomArmy.bind(this);
    this.updateStats = this.updateStats.bind(this);
    
    this.clearCanvas = this.clearCanvas.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.drawEntities = this.drawEntities.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.moveEntities = this.moveEntities.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resetGame() {
    this.paused = false;
    this.inProgress = false;
    this.player = undefined;
    this.atomArmy.length = 0;
    this.score = 0;
    this.clearCanvas();
  }

  newGame(e) {
    if (e.type === 'click') {
      this.canvas.removeEventListener('click', this.newGame);
      this.resetGame();
      this.player = new Player(this.canvas, this.ctx);
      window.addEventListener('keydown', this.player.handleKeyPress);
      window.addEventListener('keyup', this.player.handleKeyRelease);
      this.inProgress = true;

      this.statUpdater = window.setInterval(this.updateStats, 100);
      window.setInterval(this.buildAtomArmy, 2000);
      this.renderGame();
    }
  }

  renderGame() {
    if (this.paused) {
      window.clearInterval(this.generateAtom)
      return;
    }

    this.clearCanvas();
    this.drawEntities();
    this.checkCollisions();
    this.moveEntities();

    if (this.player.isPlayerDefeated()) {
      this.gameOver();
    }

    if (this.inProgress) {
      window.requestAnimationFrame(this.renderGame);
    }
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

  gameOver() {
    this.inProgress = false;
    this.atomArmy.length = 0;
    this.healthStat.innerHTML = this.player.health;
    window.removeEventListener('keydown', this.player.handleKeyPress);
    window.removeEventListener('keyup', this.player.handleKeyRelease);
    this.player = undefined;
    window.clearInterval(this.buildAtomArmy);
    window.clearInterval(this.statUpdater);
  }

  // dont' have to remove the player's eventListeners so that if game resets don't have to re-add them
  // if game over animate, else don't animate
  // on game over run fn to game.gameoverscreen

  // as long as game isn't over keep animating
  // string interpolate the player's health

  togglePause() {
    this.paused = !this.paused;
    if (!this.paused) {
      window.setInterval(this.updateStats, 100);
      this.renderGame();
    }
  }

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