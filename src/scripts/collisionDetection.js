function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

export const collisionCircleWall = (canvas, circle) => {
  if (circle.positionX + circle.dX > canvas.width - circle.radius || circle.positionX + circle.dX < circle.radius) {
    circle.dX = -(circle.dX);
  }
  if (circle.positionY + circle.dY > canvas.height - circle.radius || circle.positionY + circle.dY < circle.radius) {
    circle.dY = -(circle.dY);
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

  return circleA.radius + circleB.radius > d;
};

export const collisionCircleRectangle = (circle, rectangle) => {
  const closestX = Math.max(rectangle.positionX, Math.min(circle.positionX, rectangle.positionX + rectangle.width));
  const closestY = Math.max(rectangle.positionY, Math.min(circle.positionY, rectangle.positionY + rectangle.height));
  const d = distance(closestX, closestY, circle.positionX, circle.positionY);

  if (d <= (circle.radius)) {
    // Prevent atom from overlapping the player
    circle.positionY = closestY - circle.radius;
    circle.dX = -(circle.dX);
    circle.dY = -(circle.dY);
    return true
  }
  else {
    return false;
  }
};