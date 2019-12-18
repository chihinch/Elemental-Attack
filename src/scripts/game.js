import Player from './player';
import Control from './control';
import Slideshow from './slideshow';
import GameOverHandler from './gameOver';
import { collisionAtomWall, collisionPlayerWall, collisionAtomPlayer, collisionCircleCircle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.background = new Image();
    this.background.src = "src/assets/images/chalkboard.png";

    this.paused = true;

    this.player = new Player(this.canvas, this.ctx);

    this.slideshow = new Slideshow(this.canvas, this.ctx);
    this.control = new Control(this);

    this.atomArmy = {};
    this.atomCount = 0;
    this.atomsDefeated = 0;

    this.buildAtomArmyInterval = undefined;
    this.restoreAmmoInterval = undefined;
    this.animationRequest = undefined;
    this.gameOverAnimationRequest = undefined;
    this.restartMessageInterval = undefined;

    this.gameOverHandler = new GameOverHandler(this.canvas, this.ctx);

    this.togglePause = this.togglePause.bind(this);
    this.reset = this.reset.bind(this);
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

    this.slideshow.intro.onload = () => {
      this.slideshow.drawSlide();
    }
    this.control.addKeyDownPreGameListener();
  }

  togglePause() {
    this.paused = !this.paused;
    
    if (this.paused) {
      window.clearInterval(this.buildAtomArmyInterval);
      window.clearInterval(this.restoreAmmoInterval);
      this.slideshow.setSlide(3);
    }
    else {
      this.buildAtomArmyInterval = window.setInterval(this.buildAtomArmy, 2000);
      this.restoreAmmoInterval = window.setInterval(this.restoreAmmo, 5000);
      window.clearInterval(this.slideshow.gameMessageInterval);
      this.renderGame();
    }
  }

  reset() {
    this.atomArmy = {};
    this.atomCount = 0;
    this.atomsDefeated = 0;
    this.player.reset();
    this.gameOverHandler.reset();
  }

  newGame() {
    window.clearInterval(this.restartMessageInterval);
    this.control.removeKeyDownPreGameListener();
    this.control.removeKeyDownPostGameListener();

    this.reset();

    this.control.addKeyDownInGameListener();
    this.control.addKeyUpInGameListener();
    this.slideshow.gameStarted = true;
    this.togglePause();
  }

  gameOver() {
    window.cancelAnimationFrame(this.animationRequest);

    this.control.removeKeyDownInGameListener();
    this.control.removeKeyUpInGameListener();

    this.slideshow.gameStarted = false;
    this.paused = true;

    this.gameOverHandler.recordTimeStart();
    this.renderGameOver();
    window.setTimeout(() => {
      window.cancelAnimationFrame(this.gameOverAnimationRequest);
      this.control.addKeyDownPostGameListener();
      this.restartMessageInterval = window.setInterval(this.gameOverHandler.drawRestartMessage, 750);
      }, 6500);
  }
  
  renderGameOver() {
    this.clearCanvas();
    this.gameOverHandler.drawGameOver(this.player.points, this.atomsDefeated, this.player.ioniserFired, this.player.electronsFired);
    this.gameOverAnimationRequest = window.requestAnimationFrame(this.renderGameOver);
  }

  renderGame() {
    if (this.paused) {
      return;
    }
    
    if (this.player.isAlive()) {
      this.clearCanvas();

      this.drawBackground();
      this.drawEntities();
      this.moveEntities();
      this.checkCollisions();

      this.animationRequest = window.requestAnimationFrame(this.renderGame);
    }
    else {
      this.gameOver();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground() {
    this.ctx.drawImage(this.background, 0, 0);

    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = 'bold 20px Nunito';
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Press P for pause / help", 50, 500);
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

  moveEntities() {
    this.player.positionX += this.player.direction * this.player.dX;

    Object.values(this.atomArmy).forEach((atom) => {
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    })

    Object.values(this.player.projectiles).forEach((projectile) => {
      projectile.positionY += projectile.direction * projectile.dY;
      if (projectile.outOfBounds()) {
        delete (this.player.projectiles[projectile.ref]);
      }
    })
  }

  checkCollisions() {
    collisionPlayerWall(this.canvas, this.player);

    let atomArmy = Object.values(this.atomArmy);
    let projectiles = Object.values(this.player.projectiles);

    let projectileAtomPairs = [];
    if (projectiles.length > 0 && atomArmy.length > 0) {
      for (let i = 0; i < projectiles.length; i++) {
        for (let j = 0; j < atomArmy.length; j++) {
          projectileAtomPairs.push([projectiles[i], atomArmy[j]]);
        }
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
          this.atomCount--;
          this.atomsDefeated++;
          this.player.changePlayerStats('points', atom.atomicNumber);
        }
      };
    });

    let atomPairs = [];
    if (atomArmy.length > 1) {
      atomPairs = this.getPairs(atomArmy, 0, [], atomPairs);

      atomPairs.forEach((pair) => {
        const atomA = pair[0];
        const atomB = pair[1];
        if (collisionCircleCircle(atomA, atomB)) {
          debugger
          atomA.reverseDirection();
          atomB.reverseDirection();

          atomA.positionX += atomA.dX;
          atomA.positionY += atomA.dY;
          atomB.positionX += atomB.dX;
          atomB.positionY += atomB.dY;
        }
      });
    }

    atomArmy.forEach((atom) => {
      collisionAtomWall(this.canvas, atom);
      if (collisionAtomPlayer(atom, this.player)) {
        if (atom.nobleGas) {
          this.player.changePlayerStats('health', atom.atomicNumber);
        }
        else {
          this.player.changePlayerStats('health', -atom.atomicNumber);
        }
        delete this.atomArmy[atom.ref];
        this.atomCount--;
      }
    });
  }

  buildAtomArmy() {
    if (!this.paused) {
      if (this.atomCount >= 10) {
        return;
      }

      // Checks to make sure an atom hasn't spawned inside an existing one
      let newAtom = generateAtom(this.canvas, this.ctx);
      if (Object.values(this.atomArmy).some((atom) => {
        return collisionCircleCircle(atom, newAtom);
      })) {
        newAtom = generateAtom(this.canvas, this.ctx);
      }

      this.atomArmy[newAtom.ref] = newAtom;
      this.atomCount += 1;
    }
  }

  restoreAmmo() {
    this.player.changePlayerStats('ammo', 1);
  }

  getPairs(array, startIdx, currCombo, output) {
    if (currCombo.length === 2) {
      output.push(currCombo);
    }
    else {
      for (let i = startIdx; i < array.length; i++) {
        this.getPairs(array, i + 1, currCombo.concat(array[i]), output);
      }
    }
    return output;
  }
};