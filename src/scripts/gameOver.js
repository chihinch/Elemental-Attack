export default class GameOverHandler {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.background = new Image();
    this.background.src = "src/assets/images/aboutSlideshow/elementalAttackGameOver.png";

    this.gameOverTextY = 0;

    this.drawBackground = this.drawBackground.bind(this);
    this.drawGameOverTitle = this.drawGameOverTitle.bind(this);
  }

  drawGameOver() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawGameOverTitle();
  }

  drawBackground() {
    this.ctx.drawImage(this.background, 0, 0);
  }

  drawGameOverTitle() {
    if (this.gameOverTextY <= 100) {
      this.gameOverTextY += 2;
    }

    this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 72px "Nunito"';
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Over", (this.canvas.width / 2), this.gameOverTextY);
      this.ctx.fill();
    this.ctx.closePath();
  }
};