import Game from './scripts/game';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = '1200';
  canvas.height = '550';
  
  // Instantiate a new game
  const game = new Game(canvas, ctx);
  game.slideshow.setSlide(1);
  game.control.addKeyDownOutsideGameListener();
});