import Game from './scripts/game';

window.addEventListener('DOMContentLoaded', () => {
  const about = document.getElementById('about');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  // Instantiate a new game
  const game = new Game(canvas, ctx);
  document.addEventListener("keydown", game.newGame);
});