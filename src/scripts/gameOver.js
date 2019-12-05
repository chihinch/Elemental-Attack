export default class GameOverHandler {
  constructor(canvas, ctx, points, atomsDefeated, ioniserFired, electronsFired) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.background = new Image();
    this.background.src = "src/assets/images/aboutSlideshow/elementalAttackGameOver.png";

    this.gameOverTextY = 0;
    this.statHeaderY = 0;

    this.points = points;
    this.atomsDefeated = atomsDefeated;
    this.ioniserFired = ioniserFired;
    this.electronsFired = electronsFired;

    this.timeStart = Date.now();

    this.drawBackground = this.drawBackground.bind(this);
    this.drawGameOverTitle = this.drawGameOverTitle.bind(this);
    this.drawStatHeader = this.drawStatHeader.bind(this);
    this.drawStats = this.drawStats.bind(this);
  }

  drawGameOver() {
    this.drawBackground();
    this.drawGameOverTitle();
    this.drawStatHeader();
    this.drawStats();
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
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 1) {
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

  drawStats() {
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 2) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Points", 350, 275);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${this.points}`, 850, 275);
        this.ctx.fill();
      this.ctx.closePath();
    }
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 3) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Number of atoms defeated", 350, 305);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${this.atomsDefeated}`, 850, 305);
        this.ctx.fill();
      this.ctx.closePath();
    }
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 4) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Times ioniser fired", 350, 335);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${this.ioniserFired}`, 850, 335);
        this.ctx.fill();
      this.ctx.closePath();
    }
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 5) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Times electron gun fired", 350, 365);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${this.electronsFired}`, 850, 365);
        this.ctx.fill();
      this.ctx.closePath();
    }
  }

};