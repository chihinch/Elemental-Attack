import Projectile from "./projectile";

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

// Checks both atom-atom collision and atom-projectile collision
export const collisionCircleCircle = (circleA, circleB) => {
  const dx = circleB.positionX - circleA.positionX;
  const dy = circleB.positionY - circleA.positionY;
  const d = distance(circleA.positionX, circleA.positionY, circleB.positionX, circleB.positionY);

  const isCollision = (d <= circleA.radius + circleB.radius);

  // If an atom and projectile collide then stop here and let the game handle the consequences
  if (circleA instanceof Projectile || circleB instanceof Projectile) {
    return isCollision;
  }

  // Otherwise stop the atoms from overlapping each other leading to sticking
  if (isCollision) {
    unstickAtoms(circleA, circleB, d);
    
    circleA.reverseDirection();
    circleB.reverseDirection();
  }
  else {
    return false;
  }
};

function unstickAtoms(atomA, atomB, distance) {
  const collisionAngle = Math.atan2(atomB.positionY - atomA.positionY, atomB.positionX - atomA.positionX);
  const distToMove = atomA.radius + atomB.radius - distance;

  atomA.positionX -= (Math.cos(collisionAngle) * distToMove);
  atomA.positionY -= (Math.sin(collisionAngle) * distToMove);
  atomB.positionX += (Math.cos(collisionAngle) * distToMove);
  atomB.positionY += (Math.sin(collisionAngle) * distToMove);
}

export const collisionAtomPlayer = (atom, player) => {
  const closestX = Math.max(player.positionX - 16, Math.min(atom.positionX, player.positionX + 16));
  const closestY = Math.max(player.positionY - 62, Math.min(atom.positionY, player.positionY));
  const d = distance(closestX, closestY, atom.positionX, atom.positionY);

  return d <= atom.radius;
};