import Player from './player';
import Element from './atom';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player(this.canvas, this.ctx);

    this.paused = false;
    this.over = false;
    this.score = 0;
  }

}