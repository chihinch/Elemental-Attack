export default class Player {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.health = 100;
    this.width = 10;
    this.height = 70;
    this.positionX = (canvas.width - this.width) / 2; // Player starts at the canvas' centre
    this.direction = 0; // -1 = move left, +1 = move right (x-axis)
    this.dx = 10; // Player moves 10 pixels at a time?
    this.drawPlayer = this.drawPlayer.bind(this);
  }

  drawPlayer() {
    this.ctx.beginPath();
    this.ctx.rect(this.positionX, this.canvas.height - this.height, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
  }

  getPosition() {
    return this.positionX;
  }

  getHealth() {
    return this.health();
  }

  isPlayerDefeated() {
    return this.heath === 0;
  }

  // Eventually add cases for using the weapons
  handleKeyPress(e) {
    e.preventDefault();
    switch (e.key) {
      case ('ArrowLeft' || 'Left'):
        this.direction = -1;
        break;
      case ('ArrowRight' || 'Right'):
        this.direction = 1;
        break;
      default:
        this.direction = 0;
    }
    this.positionX = this.positionX + (this.direction * this.dx);
  }

  handleKeyRelease(e) {
    e.preventDefault();
    this.direction = 0;
  }

  // Consider refactoring this into a single changeHealth function
  // and change the health according to the healthAmt (positive or negative)
  damage(healthAmt) {
    this.health = this.health + healthAmt;
  }

  heal(healthAmt) {
    this.health = this.health + healthAmt;
  }
}