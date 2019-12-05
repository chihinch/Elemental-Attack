export default class GameOverHandler {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.background = new Image();
    this.background.src = "src/assets/images/aboutSlideshow/elementalAttackGameOver.png";

    this.gameOverTextY = 0;
    this.statHeaderY = 0;

    this.restartMessageActive = false;

    this.drawBackground = this.drawBackground.bind(this);
    this.drawGameOverTitle = this.drawGameOverTitle.bind(this);
    this.drawStatHeader = this.drawStatHeader.bind(this);
    this.drawStats = this.drawStats.bind(this);
    this.drawRestartMessage = this.drawRestartMessage.bind(this);
  }

  recordTimeStart() {
    this.timeStart = Date.now();
  }

  drawGameOver(points, atomsDefeated, ioniserFired, electronsFired) {
    this.drawBackground();
    this.drawGameOverTitle();
    this.drawStatHeader();
    this.drawStats(points, atomsDefeated, ioniserFired, electronsFired);
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
      
      this.ctx.closePath();
    }
  }

  drawStats(points, atomsDefeated, ioniserFired, electronsFired) {
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 2) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Points", 350, 275);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${points}`, 850, 275);
      this.ctx.closePath();
    }
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 3) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Number of atoms defeated", 350, 305);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${atomsDefeated}`, 850, 305);
      this.ctx.closePath();
    }
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 4) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Times ioniser fired", 350, 335);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${ioniserFired}`, 850, 335);
      this.ctx.closePath();
    }
    if (Math.floor((Date.now() - this.timeStart) / 1000) > 5) {
      this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 24px "Nunito"';
        this.ctx.textAlign = "left";
        this.ctx.fillText("Times electron gun fired", 350, 365);
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${electronsFired}`, 850, 365);
      this.ctx.closePath();
    }
  }

  drawRestartMessage() {
    this.ctx.clearRect(400, 400, 400, 70);

    this.ctx.beginPath();
    this.ctx.rect(400, 400, 400, 70);
    this.ctx.fillStyle = "black";
    this.ctx.fill();

    if (this.restartMessageActive) {
      this.ctx.beginPath();
        this.ctx.font = 'bold 30px "Nunito"';
        this.ctx.fillStyle = "#e3bc52";
        this.ctx.textAlign = "center";
      this.ctx.fillText('Press SPACE to restart', (this.canvas.width / 2), 435);

      this.restartMessageActive = false;
    }
    else {
      this.restartMessageActive = true;
    }
  }

};