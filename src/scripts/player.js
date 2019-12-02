import Projectile from "./projectile";

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.image = new Image();
    this.image.src = "/src/assets/images/chemist.png";

    this.health = 100;
    this.points = 0;

    this.width = 10;
    this.height = 30;
    this.positionX = (canvas.width - this.width) / 2; // Player starts at the canvas' centre
    this.positionY = canvas.height - this.height; // This should never change since the player is "grounded"
    this.directionalKey = undefined; 
    this.direction = 0; // -1 = move left, +1 = move right (x-axis)
    this.dX = 5;

    this.projectiles = [];
    
    // this.draw = this.draw.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.handleKeyRelease = this.handleKeyRelease.bind(this);
    // this.changePlayerStats = this.changePlayerStats.bind(this);

    // this.fireWeapon = this.fireWeapon.bind(this);
  }

  draw() {
    this.ctx.drawImage(this.image, 100, 100, 20, 20, this.canvas.width / 2, this.canvas.height, 20, 20);
  }

  drawHealth() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Health: ", 50, 50)
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    if (this.health > 25) {
      this.ctx.fillStyle = "#64a832";
    }
    else {
      this.ctx.fillStyle = "#a85732";
    }
    this.ctx.font = "bold 32px Arial";
    this.ctx.fillText(this.health.toString(), 125, 50)
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawScore() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Score: ", 50, 100)
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "#64a832";
    this.ctx.font = "bold 32px Arial";
    this.ctx.fillText(this.points.toString(), 125, 100)
    this.ctx.fill();
    this.ctx.closePath();
  }

  // // Eventually add cases for using the weapons
  // handleKeyPress(e) {
  //   e.preventDefault();
  //   console.log(e.key + 'keydown');

  //   if (e.key === 'ArrowLeft' || e.key === 'Left') {
  //     this.direction = -1;
  //     this.directionalKey = 'left';
  //   }
  //   else if (e.key === 'ArrowRight' || e.key === 'Right') {
  //     this.direction = 1;
  //     this.directionalKey = 'right';
  //   }
  //   else if (e.key === 'z') {
  //     this.fireWeapon('ioniser');
  //   }
  //   else if (e.key === 'x') {
  //     if (this.electrons > 0) {
  //       this.fireWeapon('electron');
  //       this.electrons--;
  //     }
  //   }
  // }

  // handleKeyRelease(e) {
  //   e.preventDefault();
  //   console.log(e.key + 'keyup');
  //   const directionalKeys = ['ArrowLeft', 'Left', 'ArrowRight', 'Right'];
  //   if (directionalKeys.includes(e.key)) {
  //     this.direction = 0;
  //   }
  // }

  // I moved the point tracker to game.js so that this only cares about the player's stats
  changePlayerStats(stat, amount) {
    switch (stat) {
      case 'health':
        this.health = this.health + amount;
        if (this.health > 100) {
          this.health = 100;
        }
        break;
      case 'ammo':
        this.electrons = this.electrons + amount;
        break;
      default:
        break;
    }
  }

  fireWeapon(type) {
    switch (type) {
      case 'ioniser':
        this.projectiles.push(new Projectile(this.canvas, this.ctx, 'ioniser', '#ff0000', 3, this.positionX + this.width / 2, this.positionY));
        break;
      case 'electron':
        this.projectiles.push(new Projectile(this.canvas, this.ctx, 'electron', '#ffff00', 3, this.positionX + this.width / 2, this.positionY));
        break;
      default:
        return;
    }
  }
}