import Projectile from "./projectile";

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.health = 100;
    this.electrons = 25;
    this.points = 0;

    this.electronsFired = 0;
    this.ioniserFired = 0;

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

    this.drawHealth = this.drawHealth.bind(this);
    this.drawElectrons = this.drawElectrons.bind(this);
    this.drawScore = this.drawScore.bind(this);
    this.changePlayerStats = this.changePlayerStats.bind(this);
    this.reset = this.reset.bind(this);
    this.isAlive = this.isAlive.bind(this);
  }

  draw() {
    // Image has dimensions 32px x 62px
    this.ctx.drawImage(this.image, this.positionX - 16, this.positionY - 62);

    this.drawHealth();
    this.drawElectrons();
    this.drawScore();
  }

  drawHealth() {
    let healthIcon = new Path2D();
      healthIcon.moveTo(65, 35);
      healthIcon.lineTo(65, 45);
      healthIcon.lineTo(75, 45);
      healthIcon.lineTo(75, 55);
      healthIcon.lineTo(65, 55);
      healthIcon.lineTo(65, 65);
      healthIcon.lineTo(55, 65);
      healthIcon.lineTo(55, 55);
      healthIcon.lineTo(45, 55);
      healthIcon.lineTo(45, 45);
      healthIcon.lineTo(55, 45);
      healthIcon.lineTo(55, 35);
      healthIcon.lineTo(65, 35);
    healthIcon.closePath();
    this.ctx.fillStyle = "#a85732";
    this.ctx.fill(healthIcon);

    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = 'bold 20px "Nunito"';
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Health", 85, 50)

    if (this.health > 25) {
      this.ctx.fillStyle = "#64a832";
    }
    else if (this.health >= 10 && this.health <= 25) {
      this.ctx.fillStyle = "#ffff00";
    }
    else {
      this.ctx.fillStyle = "#a85732";
    }
    this.ctx.font = 'bold 30px "Nunito"';
    this.ctx.fillText(this.health.toString(), 200, 50)
  }

  drawElectrons() {
    let electronIcon = new Path2D();
    electronIcon.arc(60, 100, 10, 0, 2 * Math.PI, true);
    electronIcon.closePath();
    this.ctx.fillStyle = "#ffff00";
    this.ctx.fill(electronIcon);

    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = 'bold 20px "Nunito"';
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Electrons", 85, 100)

    if (this.electrons > 10) {
      this.ctx.fillStyle = "#64a832";
    }
    else if (this.electrons > 0 && this.electrons <= 10) {
      this.ctx.fillStyle = "#ffff00";
    }
    else {
      this.ctx.fillStyle = "#a85732";
    }
    this.ctx.font = 'bold 30px "Nunito"';
    this.ctx.fillText(this.electrons.toString(), 200, 100)
  }

  drawScore() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = 'bold 20px Nunito';
    this.ctx.textAlign = "right";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Score", 1000, 50);

    this.ctx.fillStyle = "#64aded";
    this.ctx.font = 'bold 30px "Nunito"';
    this.ctx.fillText(this.points.toString(), 1150, 50)
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

  reset() {
    this.health = 100;
    this.electrons = 25;
    this.points = 0;
    this.ioniserFired = 0;
    this.electronsFired = 0;
    this.projectiles = {};
  }

  fireWeapon(type) {
    switch (type) {
      case 'ioniser':
        const newIoniser = new Projectile(this.canvas, this.ctx, 'ioniser', '#ff0000', 3, this.positionX, this.positionY - 75);
        this.projectiles[newIoniser.ref] = newIoniser;
        this.ioniserFired++;
        break;
      case 'electron':
        if (this.electrons <= 0) {
          return;
        }
        else {
          const newElectron = new Projectile(this.canvas, this.ctx, 'electron', '#ffff00', 3, this.positionX, this.positionY - 75);
          this.projectiles[newElectron.ref] = newElectron;
          this.electrons--;
          this.electronsFired++;
        }
        break;
      default:
        return;
    }
  }

  isAlive() {
    return this.health > 0;
  }
};