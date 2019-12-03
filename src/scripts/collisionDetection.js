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

export const collisionRectangleWall = (canvas, rectangle) => {
  const displacement = rectangle.direction * rectangle.dX;
  if (rectangle.positionX + displacement < 0) {
    rectangle.positionX = 0;
    rectangle.direction = 0; // Ensures that the even if the player keeps pressing ArrowLeft the character doesn't go off-screen
  }
  else if (rectangle.positionX + rectangle.width + displacement > canvas.width) {
    rectangle.positionX = canvas.width - rectangle.width;
    rectangle.direction = 0;
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