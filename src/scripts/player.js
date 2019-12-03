import Projectile from "./projectile";

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.health = 100;
    this.electrons = 25;
    this.points = 0;

    this.projectiles = {};

    this.image = new Image();
    this.image.src = "/src/assets/images/smallChemist.png";

    this.width = 10;
    this.height = 30;
    this.positionX = (canvas.width - this.width) / 2; // Player starts at the canvas' centre
    this.positionY = canvas.height - this.height; // This should never change since the player is "grounded"
    this.directionalKey = undefined; 
    this.direction = 0; // -1 = move left, +1 = move right (x-axis)
    this.dX = 5;

    
    this.changePlayerStats = this.changePlayerStats.bind(this);
    this.isAlive = this.isAlive.bind(this);
  }

  draw() {
    // Image has dimensions 32px x 62px
    this.ctx.drawImage(this.image, this.positionX - 16, this.positionY - 62);
  }

  drawHealth() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 24px Arial";
      this.ctx.textAlign = "left";
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
      this.ctx.textAlign = "left";
      this.ctx.fillText(this.health.toString(), 250, 50)
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawElectrons() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 24px Arial";
      this.ctx.textAlign = "left";
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
      this.ctx.textAlign = "left";
      this.ctx.fillText(this.electrons.toString(), 250, 100)
      this.ctx.fill();
    this.ctx.closePath();
  }

  drawScore() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "bold 24px Arial";
      this.ctx.textAlign = "left";
      this.ctx.fillText("Score: ", 100, 150);
      this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
      this.ctx.fillStyle = "#64a832";
      this.ctx.font = "bold 32px Arial";
      this.ctx.textAlign = "left";
      this.ctx.fillText(this.points.toString(), 250, 150)
      this.ctx.fill();
    this.ctx.closePath();
  }

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
      case 'points':
        this.points = this.points + amount;
        break;
      default:
        return;
    }
  }

  fireWeapon(type) {
    switch (type) {
      case 'ioniser':
        const newIoniser = new Projectile(this.canvas, this.ctx, 'ioniser', '#ff0000', 3, this.positionX, this.positionY - 75);
        this.projectiles[newIoniser.ref] = newIoniser;
        break;
      case 'electron':
        if (this.electrons <= 0) {
          return;
        }
        else {
          const newElectron = new Projectile(this.canvas, this.ctx, 'electron', '#ffff00', 3, this.positionX, this.positionY - 75);
          this.projectiles[newElectron.ref] = newElectron;
          this.electrons--;
        }
        break;
      default:
        return;
    }
  }

  isAlive() {
    return this.health > 0;
  }
}