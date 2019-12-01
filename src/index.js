import Game from './scripts/game';

window.addEventListener('DOMContentLoaded', () => {
  const about = document.getElementById('about');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = '1200';
  canvas.height = '600';
  
  // Instantiate a new game
  const game = new Game(canvas, ctx);
  document.addEventListener("keydown", listenForSpace);

  function listenForSpace(event) {
    switch (event.key) {
      case " ":
        game.newGame();
        break;
      default:
        return;
    }
  };

});