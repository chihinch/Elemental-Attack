export default class Slideshow {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.intro = new Image();
    this.intro.src = "https://dannychan.dev/Elemental-Attack/src/images/aboutSlideshow/elementalAttackIntro.png";

    this.story = new Image();
    this.story.src = "src/assets/images/aboutSlideshow/elementalAttackStory.png";

    this.instructions = new Image();
    this.instructions.src = "src/assets/images/aboutSlideshow/elementalAttackDiagram.png";

    this.slideNumber = 1;
    this.controlSeen = false;
    this.gameStarted = false;
    this.gameMessageActive = false;
    this.gameMessageInterval = undefined;

    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawNavbar = this.drawNavbar.bind(this);
    this.drawNavBarOne = this.drawNavBarOne.bind(this);
    this.drawNavBarTwo = this.drawNavBarTwo.bind(this);
    this.drawNavBarThree = this.drawNavBarThree.bind(this);
    this.drawSlide = this.drawSlide.bind(this);
    this.drawGameMessage = this.drawGameMessage.bind(this);
    this.advanceSlide = this.advanceSlide.bind(this);
    this.backwardSlide = this.backwardSlide.bind(this);
    this.setSlide = this.setSlide.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSlide() {
    this.clearCanvas();
    switch (this.slideNumber) {
      case 1:
        window.clearInterval(this.gameMessageInterval);
        this.ctx.drawImage(this.intro, 0, 0);
        break;
      case 2:
        window.clearInterval(this.gameMessageInterval);
        this.ctx.drawImage(this.story, 0, 0);
        break;
      case 3:
        this.ctx.drawImage(this.instructions, 0, 0);
        if (this.controlSeen === false) {
          this.controlSeen = true;
        }
        this.gameMessageInterval = window.setInterval(this.drawGameMessage, 750);
        break;
      default:
        return;
    }
    this.drawNavbar();
  }

  drawNavbar() {
    this.ctx.beginPath();
      this.ctx.rect(0, 540, 1200, 10);
      this.ctx.fillStyle = "black";
    this.ctx.fill();

    switch (this.slideNumber) {
      case 1:
        this.drawNavBarOne();
        break;
      case 2:
        this.drawNavBarOne();
        this.drawNavBarTwo();
        break;
      case 3:
        this.drawNavBarOne();
        this.drawNavBarTwo();
        this.drawNavBarThree();
        break;
      default: 
        return;
    }
  }

  drawNavBarOne() {
    this.ctx.beginPath();
      this.ctx.moveTo(0, 540);
      this.ctx.lineTo(400, 540);
      this.ctx.lineTo(425, 545);
      this.ctx.lineTo(400, 550);
      this.ctx.lineTo(0, 550);
      this.ctx.lineTo(0, 540);
      this.ctx.fillStyle = "#e60909";
    this.ctx.fill();
  }

  drawNavBarTwo() {
    this.ctx.beginPath();
      this.ctx.moveTo(400, 540);
      this.ctx.lineTo(800, 540);
      this.ctx.lineTo(825, 545);
      this.ctx.lineTo(800, 550);
      this.ctx.lineTo(400, 550);
      this.ctx.lineTo(425, 545);
      this.ctx.lineTo(400, 540);
      this.ctx.fillStyle = "#e6e609";
    this.ctx.fill();
  }

  drawNavBarThree() {
    this.ctx.beginPath();
      this.ctx.moveTo(800, 540);
      this.ctx.lineTo(1200, 540);
      this.ctx.lineTo(1200, 550);
      this.ctx.lineTo(800, 550);
      this.ctx.lineTo(825, 545);      
      this.ctx.lineTo(800, 540);      
      this.ctx.fillStyle = "#26e609";
    this.ctx.fill();
  }

  drawGameMessage() {
    this.ctx.clearRect(50, 475, 325, 35);
    this.ctx.beginPath();
      this.ctx.rect(50, 475, 325, 35);
      this.ctx.fillStyle = "black";
    this.ctx.fill();

    if (this.gameMessageActive) {
      if (this.gameStarted) {
        this.ctx.beginPath();
          this.ctx.font = 'bold 30px "Nunito"';
          this.ctx.fillStyle = "#e3bc52";
          this.ctx.textAlign = "left";
        this.ctx.fillText('Press P to resume', 50, 500);
        this.gameMessageActive = false;
      }
      else {
        this.ctx.beginPath();
          this.ctx.font = 'bold 30px "Nunito"';
          this.ctx.fillStyle = "#e3bc52";
          this.ctx.textAlign = "left";
        this.ctx.fillText('Press SPACE to begin', 50, 500);
        this.gameMessageActive = false;
      }
    }
    else {
      this.gameMessageActive = true;
    }
  }

  advanceSlide() {
    if (this.slideNumber >= 1 && this.slideNumber < 3) {
      this.slideNumber++;
    }
    else {
      return;
    }
    this.drawSlide();
  }

  backwardSlide() {
    if (this.slideNumber >= 2  && this.slideNumber <= 3) {
      this.slideNumber--;
    }
    else {
      return;
    }
    this.drawSlide();
  }

  setSlide(num) {
    if (num >= 1 && num <=3) {
      this.slideNumber = num;
    }
    else {
      return;
    }
    this.drawSlide();
  }
};