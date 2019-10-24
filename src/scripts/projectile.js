export default class Projectile {
  constructor(canvas, ctx, type, color, radius, positionX, positionY) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.type = type;
    this.color = color;
    this.radius = radius;
    this.positionX = positionX;
    this.positionY = positionY;
    this.dX = 0;
    this.dY = 5;

    this.initialDirection();
    this.identifyFoe();

    this.draw = this.draw.bind(this);
  }

  initialDirection() {
    this.direction = this.type === 'neutron' ? -1 : 1;
  }

  identifyFoe() {
    this.foe = this.type === 'neutron' ? 'player' : 'atom';
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.stroke();
  }

}