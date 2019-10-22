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
  if (rectangle.positionX < 0) {
    rectangle.positionX = 0;
  }
  else if (rectangle.positionX + rectangle.width > canvas.width) {
    rectangle.positionX = canvas.width - rectangle.width;
  }
};

export const collisionCircleCircle = (circleA, circleB) => {
  // const sideX = Math.abs(circle1.positionX - circle2.positionX);
  // const sideY = Math.abs(circle1.positionY - circle2.positionY);

  // const hypotenuse = (sideX ** 2) + (sideY ** 2);
  const hypotenuse = distanceSquared(cirlceA.positionX, circleA.positionY, circleB.positionX, circleB.positionY);

  // return (hypotenuse < (circleA.radius + circleB.radius) ? true : false);

  if (hypotenuse < ((circleA.radius + circleB.radius) ** 2)) {
    circleA.dX = -(circleA.dX);
    circleA.dY = -(circleA.dY);
    circleB.dX = -(cirlceB.dX);
    circleB.dY = -(circleB.dY);
  }
};

export const collisionCircleRectangle = (circle, rectangle) => {
  const closestX = Math.max(rectangle.positionX, Math.min(circle.positionX, rectangle.positionX + rectangle.width));
  const closestY = Math.max(rectangle.positionY, Math.min(circle.positionY, rectangle.positionY + rectangle.height));
  const hypotenuse = distanceSquared(closestX, closestY, circle.positionX, circle.positionY);

  if (hypotenuse < (circle.radius ** 2)) {
    circle.dX = -(circle.dX);
    circle.dY = -(circle.dY);
    return true
  }
  else {
    return false;
  }
};