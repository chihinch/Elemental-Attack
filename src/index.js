// import './styles/index.css';
import Game from './scripts/game';

window.addEventListener('DOMContentLoaded', () => {
  const webpage = document.getElementById('webpage');

  // Get the canvas
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  // Instantiate a new game
  const game = new Game(canvas, ctx);
});