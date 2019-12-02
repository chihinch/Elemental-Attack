import Game from './scripts/game';
import Control from './scripts/control';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = '1200';
  canvas.height = '600';
  
  // Instantiate a new game
  const game = new Game(canvas, ctx);
});