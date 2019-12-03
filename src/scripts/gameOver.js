export default class GameOverHandler {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.gameOverTextY = 0;
  }

  drawGameOver() {
    if (this.gameOverTextY <= 100) {
      this.gameOverTextY += 2;
    }

    this.ctx.beginPath();
      this.ctx.fillStyle = "black";
      this.ctx.font = "72px Verdana";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Over", (this.canvas.width / 2), this.gameOverTextY);
      this.ctx.fill();
    this.ctx.closePath();
  }
};