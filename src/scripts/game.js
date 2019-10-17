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

    // Elemental properties
    this.periodicTable = require('../assets/data/periodicTable');

    this.newGame = this.newGame.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);

    this.healthStat = document.getElementById('health-stat');
    this.ammoStat = document.getElementById('ammo-stat');
    this.pointStat = document.getElementById('point-stat');

    this.isGameOver = this.isGameOver.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.updateStats = this.updateStats.bind(this);

    this.generateAtom = this.generateAtom.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Reset the game
  resetGame() {
    this.entities = {};
    this.player = undefined;
    this.score = 0;
  }

  // Begin a new game
  newGame(e) {
    // debugger
    if (e.type === 'click') {
      // debugger
      this.canvas.removeEventListener('click', this.newGame);
      this.resetGame();
      this.player = new Player(this.canvas, this.ctx);
      // debugger
      this.statUpdater = window.setInterval(this.updateStats, 1000);
      requestAnimationFrame(this.renderGame);
    }
  }

  // Draw on the canvas
  renderGame() {
    // Return nothing if the game is paused
    if (this.paused) {
      return;
    }

    
    this.clearCanvas();
    this.player.draw();
    
    let newAtom = this.generateAtom();
    newAtom.draw();

    if (this.isGameOver()) {
      this.gameOver();
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

  // Update stats shown on screen
  updateStats() {
  // debugger
  this.healthStat.innerHTML = this.player.health;
  this.ammoStat.innerHTML = this.player.electrons;
  this.pointStat.innerHTML = this.score;
  }

  generateAtom() {
    const element = this.periodicTable.numbers[Math.floor(Math.random() * 92)];
    let oxidationState;
    // debugger
    // Element has only one oxidation state
    if (typeof element.oxidationStates === 'number') {
      oxidationState = element.oxidationStates;
    }
    // Element has multiple oxidation states: choose one based on its electronegativity
    else {
      const oxStates = element.oxidationStates.split(", ");
      // debugger
      if (element.electronegativity >= 2.50) {
        oxidationState = parseInt(oxStates[oxStates.length - 1]);
      } 
      else {
        oxidationState = parseInt(oxStates[0]);
      }
    }

    return new Atom(this.canvas, this.ctx, element.cpkHexColor, element.symbol, element.atomicRadius, element.atomicMass, oxidationState);
  }

}