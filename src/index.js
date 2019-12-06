import Game from './scripts/game';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = '1200';
  canvas.height = '550';
  
  // Instantiate a new game
  let game = new Game(canvas, ctx);
};