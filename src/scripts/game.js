// import Player from './player';
import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.paused = true;

    this.atomArmy = [];

    this.togglePause = this.togglePause.bind(this);
    this.newGame = this.newGame.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawEntities = this.drawEntities.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.moveEntities = this.moveEntities.bind(this);
    this.buildAtomArmy = this.buildAtomArmy.bind(this);
  }

  togglePause() {
    this.paused = !this.paused;

    const about = document.getElementById("about");
    const canvasContainer = document.getElementById("canvas-container");

    
    if (this.paused) {
      about.style.display = "block";
      canvasContainer.style.display = "none";
      window.clearInterval(this.buildAtomArmy);
    }
    else {
      about.style.display = "none";
      canvasContainer.style.display = "block";
      window.setInterval(this.buildAtomArmy, 2000);
      this.renderGame();
    }
  }

  newGame() {
    console.log("felsjkges registered");
    
    // const about = document.getElementById("about");
    // const canvasContainer = document.getElementById("canvas-container");
    
    // about.style.display = "none";
    // canvasContainer.style.display = "block";

    this.togglePause();
    this.renderGame();
  }

  renderGame() {
    if (this.paused) {
      return;
    }

    this.clearCanvas();
    this.drawEntities();
    this.checkCollisions();
    this.moveEntities();

    // if (this.player.health === 0) {
    //   this.gameOver();
    // }

    window.requestAnimationFrame(this.renderGame);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawEntities() {
    // this.player.draw();
    this.atomArmy.forEach((atom) => {
      // console.log(atom.radius);
      atom.draw();
    });
    // this.player.projectiles.forEach((projectile) => {
    //   projectile.draw();
    // })
  }

  checkCollisions() {
    // collisionRectangleWall(this.canvas, this.player);
    this.atomArmy.forEach((atom) => {
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

  moveEntities() {
    // this.player.positionX += this.player.direction * this.player.dX;
    this.atomArmy.forEach((atom) => {
      atom.positionX += atom.dX;
      atom.positionY += atom.dY;
    })
    // this.player.projectiles.forEach((projectile) => {
    //   projectile.positionY += projectile.direction * projectile.dY;
    //   if (projectile.outOfBounds()) {
    //     this.player.projectiles.splice(this.player.projectiles.indexOf(projectile), 1);
    //   }
    // })
  }

  buildAtomArmy() {
    if (!this.paused) {
      if (this.atomArmy.length >= 10) {
        return;
      }
      this.atomArmy.push(generateAtom(this.canvas, this.ctx));
    }
  }
}