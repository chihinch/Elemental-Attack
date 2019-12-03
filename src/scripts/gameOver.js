export default class GameOver {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.font = "72px Verdana";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Over", (this.canvas.width / 2), 110);
      this.ctx.fill();
    this.ctx.closePath();
  }
};