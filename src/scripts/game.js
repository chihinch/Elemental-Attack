import Player from './player';
import Control from './control';
import Slideshow from './slideshow';
import GameOverHandler from './gameOver';
import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle, collisionCircleCircle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.paused = true;

    this.player = new Player(this.canvas, this.ctx);

    this.slideshow = new Slideshow(this.canvas, this.ctx);
    this.gameOverHandler = new GameOverHandler(this.canvas, this.ctx);
    this.control = new Control(this);

    this.atomArmy = {};
    this.atomCount = 0;

    this.animationRequest = undefined;
    this.gameOverAnimationRequest = undefined;

    this.background = new Image();
    this.background.src = "src/assets/images/chalkboard.png";

    this.togglePause = this.togglePause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.renderGameOver = this.renderGameOver.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.drawEntities = this.drawEntities.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.moveEntities = this.moveEntities.bind(this);
    this.buildAtomArmy = this.buildAtomArmy.bind(this);
    this.restoreAmmo = this.restoreAmmo.bind(this);
    this.getPairs = this.getPairs.bind(this);
  }

  togglePause() {
    this.paused = !this.paused;
    
    if (this.paused) {
      console.log(this.animationRequest);
      window.clearInterval(this.buildAtomArmy);
      window.clearInterval(this.restoreAmmo);
      this.slideshow.setSlide(3);
    }
    else {
      window.setInterval(this.buildAtomArmy, 2000);
      window.setInterval(this.restoreAmmo, 5000);
      window.clearInterval(this.slideshow.gameMessageInterval);
      this.renderGame();
    }
  }

  newGame() {
    this.control.removeKeyDownOutsideGameListener();
    this.control.addKeyDownInGameListener();
    this.control.addKeyUpInGameListener();
    this.slideshow.gameStarted = true;
    this.togglePause();
  }

  gameOver() {
    console.log(this.animationRequest);
    console.log('Game over');
    this.control.removeKeyDownInGameListener();
    this.control.removeKeyUpInGameListener();
    this.slideshow.gameStarted = false;
    this.renderGameOver();
  }
  
  renderGameOver() {
    this.gameOverHandler.drawGameOver();
    this.gameOverAnimationRequest = window.requestAnimationFrame(this.renderGameOver);
  }

  renderGame() {
    if (this.paused) {
      return;
    }

    console.log(this.animationRequest);

    this.clearCanvas();
    this.drawBackground();
    this.drawEntities();
    this.checkCollisions();
    this.moveEntities();
    
    this.player.drawHealth();
    this.player.drawElectrons();
    this.player.drawScore();
    
    if (this.player.isAlive()) {
      this.animationRequest = window.requestAnimationFrame(this.renderGame);
    }
    else {
      window.cancelAnimationFrame(this.animationRequest);
      this.gameOver();
    }

  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.drawImage(this.background, 0, 0);
  }

  drawEntities() {
    this.player.draw();

    Object.values(this.atomArmy).forEach((atom) => {
      atom.draw();
    });

    Object.values(this.player.projectiles).forEach((projectile) => {
      projectile.draw();
    });
  }

  checkCollisions() {
    collisionRectangleWall(this.canvas, this.player);

    let atomArmy = Object.values(this.atomArmy);
    let projectiles = Object.values(this.player.projectiles);

    atomArmy.forEach((atom) => {
      collisionCircleWall(this.canvas, atom);
      if (collisionCircleRectangle(atom, this.player)) {
        if (atom.nobleGas) {
          this.player.changePlayerStats('health', 5);
          delete this.atomArmy[atom.ref];
        }
        else {
          this.player.changePlayerStats('health', -5);
        }
      }
    });

    let projectileAtomPairs = [];
    if (projectiles.length > 0 && atomArmy.length > 0) {
        for (let i = 0; i < projectiles.length; i++) {
          for (let j = 0; j < atomArmy.length; j++) {
            projectileAtomPairs.push([projectiles[i], atomArmy[j]]);
          }
      }

      projectileAtomPairs.forEach((pair) => {
        const projectile = pair[0];
        const atom = pair[1];

        if (collisionCircleCircle(projectile, atom)) {
          if (!atom.nobleGas) {
            delete this.player.projectiles[projectile.ref];
            atom.damage(projectile.type);
          }

          if (atom.isAtomDefeated()) {
            delete this.atomArmy[atom.ref];
            this.player.changePlayerStats('points', atom.atomicNumber);
          }
        }
      })
    }

    let atomPairs = [];
    if (atomArmy.length > 1) {
      this.getPairs(atomArmy, 0, [], atomPairs);

      atomPairs.forEach((pair) => {
        if (collisionCircleCircle(pair[0], pair[1])) {
          pair[0].reverseDirection();
          pair[1].reverseDirection();
        }
      });
    }

  }

  moveEntities() {
    this.player.positionX += this.player.direction * this.player.dX;

    Object.values(this.atomArmy).forEach((atom) => {
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    })

    Object.values(this.player.projectiles).forEach((projectile) => {
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

      const newAtom = generateAtom(this.canvas, this.ctx);
      this.atomArmy[newAtom.ref] = newAtom;
      this.atomCount += 1;
    }
  }

  restoreAmmo() {
    this.player.changePlayerStats('ammo', 1);
  }

  getPairs(array, startIdx, currCombo, output) {
    if (currCombo.length >= 2) {
      output.push(currCombo);
    }
    else {
      for (let i = startIdx; i < array.length; i++) {
        this.getPairs(array, i + 1, currCombo.concat(array[i]), output);
      }
    }
  }
};