import { collisionCircleWall } from './collisionDetection';

export default class Atom {
  constructor(canvas, ctx, cpkHexColor, symbol, atomicRadius, atomicMass, oxidationState) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.cpkHexColor = cpkHexColor;
    this.symbol = symbol;
    this.atomicRadius = atomicRadius;
    this.atomicMass = atomicMass;
    this.oxidationState = oxidationState;
    this.currentOxidationState = 3;

    this.nobleGas = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(symbol)
    this.radius = Math.sqrt(this.atomicRadius) * 2;

    // Atom is generated at a random position on the x-axis on the top of the screen
    this.positionX = Math.random() * (canvas.width - 200);
    this.positionY = Math.random() * (canvas.height - 200);

    // Speed of the atom
    this.dX = Math.random() * 4 - 2;
    this.dY = Math.random() * 4 -2;

    this.draw = this.draw.bind(this);
  }

  draw() {
    const fontSize = this.radius * 0.75;
    let oxidationStateDisplay;
    if (this.currentOxidationState > 0) {
      oxidationStateDisplay = '+' + this.currentOxidationState.toString();
    } 
    else if (this.currentOxidationState == 0) {
      oxidationStateDisplay = "";
    } 
    else {
      oxidationStateDisplay = this.currentOxidationState.toString();
    }

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.cpkHexColor;
    this.ctx.fillStyle = this.cpkHexColor;
    this.ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillText(this.symbol, this.positionX - (fontSize * 0.25), this.positionY, this.radius);
    this.ctx.beginPath();
    this.ctx.font = `${fontSize * 0.6}px Arial`
    this.ctx.fillText(oxidationStateDisplay, this.positionX + (fontSize * 0.6), this.positionY - (fontSize * 0.6));
    this.ctx.closePath();
  }

  damageAtom(weapon) {
    // The goal is to make currentOxidationState = oxidationState

    // Ionisers can only hit elements with positive oxidation states
    if (weapon === 'ioniser' && this.oxidationState > 0) {
      this.currentOxidationState = this.currentOxidationState - 1;
    } 
    // Electron guns can only hit elements with negative oxidation states
    else if (weapon === 'electronGun' && this.oxidationState < 0) {
      this.currentOxidationState = this.currentOxidationState + 1;
    }
    // Ensure that currentOxidationState isn't changed otherwise
    else {
      this.currentOxidationState = this.currentOxidationState + 0;
    }
  }

  // Atom is defeated if its current oxidation state = its assigned (target) oxidation state
  isAtomDefeated() {
    return this.oxidationState === this.currentOxidationState;
  }

}