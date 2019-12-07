function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

export const collisionAtomWall = (canvas, atom) => {
  if (atom.positionX + atom.dX > canvas.width - atom.radius || atom.positionX + atom.dX < atom.radius) {
    atom.dX = -(atom.dX);
  }
  if (atom.positionY + atom.dY > canvas.height - atom.radius || atom.positionY + atom.dY < atom.radius) {
    atom.dY = -(atom.dY);
  }
};

export const collisionPlayerWall = (canvas, player) => {
  const displacement = player.direction * player.dX;

  // Take into account that the player has a width of 32, and positionX is its centreline (16)
  if (player.positionX - 16 + displacement < 0) {
    player.positionX = 16;
    player.direction = 0;
  }
  else if (player.positionX + 16 + displacement > canvas.width) {
    player.positionX = canvas.width - 16;
    player.direction = 0;
  }
};

export const collisionCircleCircle = (circleA, circleB) => {
  const d = distance(circleA.positionX, circleA.positionY, circleB.positionX, circleB.positionY);

  return d < circleA.radius + circleB.radius;
};

export const collisionAtomPlayer = (atom, player) => {
  const closestX = Math.max(player.positionX - 16, Math.min(atom.positionX, player.positionX + 16));
  const closestY = Math.max(player.positionY - 62, Math.min(atom.positionY, player.positionY));
  const d = distance(closestX, closestY, atom.positionX, atom.positionY);

  return d <= atom.radius;
};