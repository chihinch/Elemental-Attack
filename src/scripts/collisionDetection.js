export const collisionCircleWall = (canvas, circle) => {
  if (circle.positionX + circle.dX > canvas.width - circle.radius || circle.positionX + circle.dX < circle.radius) {
    circle.dX = -(circle.dX);
  }
  if (circle.positionY + circle.dY > canvas.height - circle.radius || circle.positionY + circle.dY < circle.radius) {
    circle.dY = -(circle.dY);
  }
}

export const collisionCircleCircle = (circleA, circleB) => {
  const sideX = Math.abs(circle1.positionX - circle2.positionX);
  const sideY = Math.abs(circle1.positionY - circle2.positionY);

  const hypotenuse = (sideX ** 2) + (sideY ** 2);

  return (hypotenuse < (circleA.radius + circleB.radius) ? true : false);
}