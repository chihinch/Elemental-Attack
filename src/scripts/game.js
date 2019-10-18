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

    // Current atoms being displayed
    this.atomArmy = [];

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
    // this.generateArmyofAtoms = this.generateArmyofAtoms.bind(this);
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
    if (e.type === 'click') {
      this.canvas.removeEventListener('click', this.newGame);
      this.resetGame();
      this.player = new Player(this.canvas, this.ctx);
      // this.testAtom = this.generateAtom();
      // this.testAtomB = this.generateAtom();
      this.statUpdater = window.setInterval(this.updateStats, 1000);
      
      window.setInterval(this.renderGame, 10);
      window.setInterval(this.generateAtom, 3000);
    }
  }
  
  // Draw on the canvas
  renderGame() {
    // Return nothing if the game is paused
    if (this.paused) {
      window.clearInterval(this.generateAtom)
      return;
    }

    // Generate a new atom every 5 seconds while there are fewer than 10 atoms simultaneously bouncing around
    this.clearCanvas();
    this.player.draw();

    this.atomArmy.forEach((atom) => {
      atom.draw();
    });

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
    window.clearInterval(this.renderGame);
  }

  // Toggle pause
  togglePause() {
    this.paused = !this.paused;
  }

  // Update stats shown on screen
  updateStats() {
  this.healthStat.innerHTML = this.player.health;
  this.ammoStat.innerHTML = this.player.electrons;
  this.pointStat.innerHTML = this.score;
  }

  generateAtom() {
    // Yes, the player should be bombarded with atoms, but I'll keep the number of atoms
    // simultaneously bouncing around reasonable
    if (this.atomArmy.length > 10) {
      return;
    }

    const element = this.periodicTable.numbers[Math.floor(Math.random() * 92)];
    let oxidationState;
    // Element has only one oxidation state
    if (typeof element.oxidationStates === 'number') {
      oxidationState = element.oxidationStates;
    }
    // Element has multiple oxidation states: choose one based on its electronegativity
    else {
      const oxStates = element.oxidationStates.split(", ");
      if (element.electronegativity >= 2.50) {
        oxidationState = parseInt(oxStates[oxStates.length - 1]);
      } 
      else {
        oxidationState = parseInt(oxStates[0]);
      }
    }

    const newAtom = new Atom(this.canvas, this.ctx, element.cpkHexColor, element.symbol, element.atomicRadius, element.atomicMass, oxidationState);
    this.atomArmy.push(newAtom);
  }

}