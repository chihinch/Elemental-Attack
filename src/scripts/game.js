// import Player from './player';
// import { collisionCircleWall, collisionRectangleWall, collisionCircleRectangle } from './collisionDetection';
import { generateAtom } from './atomGenerator';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.newGame = this.newGame.bind(this);
  }

  newGame() {
    console.log("registered");
    
    const about = document.getElementById("about");
    const canvasContainer = document.getElementById("canvas-container");
    
    document.removeEventListener("click", this.newGame)
    about.style.display = "none";
    canvasContainer.style.display = "block";
  }
}