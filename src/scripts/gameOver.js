export default class GameOverHandler {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.background = new Image();
    this.background.src = "src/assets/images/aboutSlideshow/elementalAttackGameOver.png";

    this.gameOverTextY = 0;
    this.statHeaderY = 0;

    this.timeInstantiated = Date.now();

    this.drawBackground = this.drawBackground.bind(this);
    this.drawGameOverTitle = this.drawGameOverTitle.bind(this);
    this.drawStatHeader = this.drawStatHeader.bind(this);
  }

  drawGameOver() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawGameOverTitle();
    this.drawStatHeader();

    const timeNow = Date.now();
    const timeDiff = Math.floor((timeNow - this.timeInstantiated) / 1000);

    // if (timeDiff > 2) {
    //   this.drawStatHeader();
    // }
  }

  drawBackground() {
    this.ctx.drawImage(this.background, 0, 0);
  }

  drawGameOverTitle() {
    if (this.gameOverTextY < 100) {
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

  drawStatHeader() {
    if (Math.floor((Date.now() - this.timeInstantiated) / 1000) > 2) {
      if (this.statHeaderY < 200) {
        this.statHeaderY += 4;
      }

      this.ctx.beginPath();
      this.ctx.fillStyle = "white";
      this.ctx.font = 'bold 48px "Nunito"';
      this.ctx.textAlign = "center";
      this.ctx.fillText("Game Stats", (this.canvas.width / 2), this.statHeaderY);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
};