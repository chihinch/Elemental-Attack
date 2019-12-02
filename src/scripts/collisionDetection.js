function distanceSquared(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2) + ((y1 - y2) ** 2);
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
  const dSquared = distanceSquared(circleA.positionX, circleA.positionY, circleB.positionX, circleB.positionY);

  if (dSquared < ((circleA.radius + circleB.radius) ** 2)) {
    circleA.dX = -(circleA.dX);
    circleA.dY = -(circleA.dY);
    circleB.dX = -(circleB.dX);
    circleB.dY = -(circleB.dY);
  }
};

export const collisionCircleRectangle = (circle, rectangle) => {
  const closestX = Math.max(rectangle.positionX, Math.min(circle.positionX, rectangle.positionX + rectangle.width));
  const closestY = Math.max(rectangle.positionY, Math.min(circle.positionY, rectangle.positionY + rectangle.height));
  const dSquared = distanceSquared(closestX, closestY, circle.positionX, circle.positionY);

  if (dSquared <= (circle.radius ** 2)) {
    // Prevent atom from overlapping the player
    if (dSquared < (circle.radius ** 2)) {
      circle.positionY = closestY - circle.radius;
    }
    circle.dX = -(circle.dX);
    circle.dY = -(circle.dY);
    return true
  }
  else {
    return false;
  }
};