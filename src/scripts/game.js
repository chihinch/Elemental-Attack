import Player from './player';
import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';
import Control from './control';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.paused = true;

    this.control = new Control(this);
    this.control.addKeyDownListener();
    this.control.addKeyUpListener();
    
    this.player = new Player(canvas, ctx);

    this.atomArmy = {};
    this.atomCount = 0;

    this.togglePause = this.togglePause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawEntities = this.drawEntities.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.moveEntities = this.moveEntities.bind(this);
    this.buildAtomArmy = this.buildAtomArmy.bind(this);
    this.restoreAmmo = this.restoreAmmo.bind(this);
  }

  togglePause() {
    this.paused = !this.paused;

    const about = document.getElementById("about");
    const canvasContainer = document.getElementById("canvas-container");

    
    if (this.paused) {
      about.style.display = "block";
      canvasContainer.style.display = "none";
      window.clearInterval(this.buildAtomArmy);
      window.clearInterval(this.restoreAmmo);
    }
    else {
      about.style.display = "none";
      canvasContainer.style.display = "block";
      window.setInterval(this.buildAtomArmy, 2000);
      window.setInterval(this.restoreAmmo, 5000);
      this.renderGame();
    }
  }

  newGame() {
    this.togglePause();
    this.renderGame();
  }

  gameOver() {
    this.control.removeKeyDownListener();
    this.control.removeKeyUpListener();
  }

  renderGame() {
    let animationRequest = window.requestAnimationFrame(this.renderGame);

    if (this.paused) {
      cancelAnimationFrame(animationRequest);
      return;
    }

    const atomArmy = Object.values(this.atomArmy);
    const projectiles = Object.values(this.player.projectiles);

    this.clearCanvas();
    this.drawEntities(atomArmy, projectiles);
    this.checkCollisions(atomArmy, projectiles);
    this.moveEntities(atomArmy, projectiles);


    if (this.player.health > 0) {
      this.player.drawHealth();
      this.player.drawElectrons();
      this.player.drawScore();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawEntities(atomArmy, projectiles) {
    this.player.draw();

    atomArmy.forEach((atom) => {
      atom.draw();
    });

    projectiles.forEach((projectile) => {
      projectile.draw();
    });
  }

  checkCollisions(atomArmy, projectiles) {
    collisionRectangleWall(this.canvas, this.player);

    atomArmy.forEach((atom) => {
      collisionCircleWall(this.canvas, atom);
      // if (collisionCircleRectangle(atom, this.player)) {
      //   if (atom.nobleGas) {
      //     this.player.changePlayerStats('health', 5);
      //     this.atomArmy.splice(this.atomArmy.indexOf(atom), 1);
      //   }
      //   else {
      //     this.player.changePlayerStats('health', -5);
      //   }
      // }
    });
  }

  moveEntities(atomArmy, projectiles) {
    this.player.positionX += this.player.direction * this.player.dX;

    atomArmy.forEach((atom) => {
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    })

    projectiles.forEach((projectile) => {
      projectile.positionY += projectile.direction * projectile.dY;
      if (projectile.outOfBounds()) {
        delete(this.player.projectiles[projectile.ref]);
      }
    })
  }

  buildAtomArmy() {
    if (!this.paused) {
      if (this.atomCount >= 10) {
        return;
      }
      this.atomArmy[`atom-${this.atomCount}`] = generateAtom(this.canvas, this.ctx);
      this.atomCount += 1;
    }
  }

  restoreAmmo() {
    this.player.changePlayerStats('ammo', 1);
  }
}