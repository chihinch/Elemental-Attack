import Projectile from "./projectile";

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.image = new Image();
    this.image.src = "/src/assets/images/chemist.png";

    this.health = 100;
    this.electrons = 25;
    this.points = 0;

    this.width = 10;
    this.height = 30;
    this.positionX = (canvas.width - this.width) / 2; // Player starts at the canvas' centre
    this.positionY = canvas.height - this.height; // This should never change since the player is "grounded"
    this.directionalKey = undefined; 
    this.direction = 0; // -1 = move left, +1 = move right (x-axis)
    this.dX = 5;

    this.projectiles = [];
    
    this.changePlayerStats = this.changePlayerStats.bind(this);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.positionX, this.positionY, this.width, this.height);
    this.ctx.stroke();
    // this.ctx.drawImage(this.image, 100, 100, 20, 20, this.canvas.width / 2, this.canvas.height, 20, 20);
  }

  drawHealth() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Health: ", 100, 50)
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
    this.ctx.fillText(this.health.toString(), 250, 50)
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawElectrons() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Electrons: ", 100, 100)
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    if (this.electrons > 10) {
      this.ctx.fillStyle = "#64a832";
    }
    else {
      this.ctx.fillStyle = "#a85732";
    }
    this.ctx.font = "bold 32px Arial";
    this.ctx.fillText(this.electrons.toString(), 250, 100)
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawScore() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "bold 24px Arial";
    this.ctx.fillText("Score: ", 100, 150)
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "#64a832";
    this.ctx.font = "bold 32px Arial";
    this.ctx.fillText(this.points.toString(), 250, 150)
    this.ctx.fill();
    this.ctx.closePath();
  }

  // handleKeyRelease(e) {
  //   e.preventDefault();
  //   console.log(e.key + 'keyup');
  //   const directionalKeys = ['ArrowLeft', 'Left', 'ArrowRight', 'Right'];
  //   if (directionalKeys.includes(e.key)) {
  //     this.direction = 0;
  //   }
  // }

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
        if (this.electrons > 25) {
          this.electrons = 25;
        }
        break;
      default:
        return;
    }
  }

  fireWeapon(type) {
    switch (type) {
      case 'ioniser':
        this.projectiles.push(new Projectile(this.canvas, this.ctx, 'ioniser', '#ff0000', 3, this.positionX + this.width / 2, this.positionY));
        break;
      case 'electron':
        if (this.electrons <= 0) {
          return;
        }
        else {
          this.projectiles.push(new Projectile(this.canvas, this.ctx, 'electron', '#ffff00', 3, this.positionX + this.width / 2, this.positionY));
          this.electrons--;
        }
        break;
      default:
        return;
    }
  }
}