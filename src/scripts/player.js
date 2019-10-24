import Projectile from "./projectile";

export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    // Attempting to decorate the player - holding off on it for now
    this.image = new Image();
    // this.image.src = '../assets/images/chemist.png';
    // debugger

    this.health = 100;
    this.electrons = 25;
    this.width = 10;
    this.height = 30;
    this.positionX = (canvas.width - this.width) / 2; // Player starts at the canvas' centre
    this.positionY = canvas.height - this.height; // This should never change since the player is "grounded" 
    this.direction = 0; // -1 = move left, +1 = move right (x-axis)
    this.dX = 10;

    this.projectiles = [];
    
    this.draw = this.draw.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
    this.changePlayerStats = this.changePlayerStats.bind(this);

    this.fireWeapon = this.fireWeapon.bind(this);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.positionX, this.positionY, this.width, this.height);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }

  isPlayerDefeated() {
    return this.health == 0;
  }

  isAmmoEmpty() {
    return this.electrons == 0;
  }

  // Eventually add cases for using the weapons
  handleKeyPress(e) {
    e.preventDefault();
    console.log(e.key);
    switch (e.key) {
      case ('ArrowLeft' || 'Left'):
        this.direction = -1;
        break;
      case ('ArrowRight' || 'Right'):
        this.direction = 1;
        break;
      case 'z':
        this.fireWeapon('ioniser');
      default:
        this.direction = 0;
    }
  }

  handleKeyRelease(e) {
    e.preventDefault();
    this.direction = 0;
  }

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
    // centreOfPlayer = this.positionX + this.width / 2;
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