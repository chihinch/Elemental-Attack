export default class Slideshow {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.intro = new Image();
    this.intro.src = "/src/assets/images/chemist.png";
    // this.intro.src = "/src/assets/images/aboutSlideshow/elementalAttackIntro.png";

    this.story = new Image();
    this.story.src = "/src/assets/images/aboutSlideshow/elementalAttackStory.png";

    this.instructions = new Image();
    this.instructions.src = "/src/assets/images/aboutSlideshow/elementalAttackDiagram.png";

    this.slideNumber = 1;
    this.allowGameStart = false;

    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawIntro = this.drawIntro.bind(this);
    this.drawStory = this.drawStory.bind(this);
    this.drawInstructions = this.drawInstructions.bind(this);
    this.drawNavbar = this.drawNavbar.bind(this);
    this.drawSlide = this.drawSlide.bind(this);
    this.advanceSlide = this.advanceSlide.bind(this);
    this.backwardSlide = this.backwardSlide.bind(this);
    this.setSlide = this.setSlide.bind(this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawIntro() {
    this.ctx.drawImage(this.intro, 100, 100);
  }

  drawStory() {
    this.ctx.drawImage(this.story, 0, 0);
  }

  drawInstructions() {
    this.ctx.drawImage(this.instructions, 0, 0);
    this.allowGameStart = true;
  }

  drawNavbar() {
    const currentColor = "#9bf542";
    const otherColor = "#ffffff";

    this.ctx.beginPath();
      this.ctx.rect(0, 575, 1200, 25);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
      this.ctx.stroke();
    this.ctx.closePath();
      
    this.ctx.beginPath();
      this.ctx.strokeStyle = currentColor;
      this.ctx.fillStyle = currentColor;
      this.ctx.arc(300, 588, 10, 0, 2 * Math.PI, true);
      this.ctx.fill();
      this.ctx.stroke();
    this.ctx.closePath();
  }

  drawSlide() {
    this.clearCanvas();
    this.drawNavbar();
    switch (this.slideNumber) {
      case 1:
        this.drawIntro();
        break;
      case 2:
        this.drawStory();
        break;
      case 3:
        this.drawInstructions();
        break;
      default:
        return;
    }
  }

  advanceSlide() {
    if (this.slideNumber >= 1 && this.slideNumber < 3) {
      this.slideNumber++;
    }
    else {
      return;
    }
  }

  backwardSlide() {
    if (this.slideNumber >= 2  && this.slideNumber <= 3) {
      this.slideNumber--;
    }
    else {
      return;
    }
  }

  setSlide(num) {
    if (num >= 1 && num <=3) {
      this.slideNumber = num;
    }
    else {
      return;
    }
  }
};

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   const slides = document.getElementsByClassName("about-slide");
//   const dots = document.getElementsByClassName("dot");
//   if (n > slides.length) { slideIndex = 1 }
//   if (n < 1) { slideIndex = slides.length }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }