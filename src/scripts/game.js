import Player from './player';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(this.canvas, this.ctx);
  }

  
}