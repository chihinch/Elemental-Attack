export default class Atom {
  constructor(canvas, ctx, cpkHexColor, symbol, atomicMass, atomicRadius, oxidationState) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.cpkHexColor = cpkHexColor;
    this.symbol = symbol;
    this.mass = atomicMass;
    this.atomicRadius = atomicRadius;
    this.currentOxidationState = oxidationState;

    this.nobleGas = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(symbol);
    this.radius = Math.ceil(Math.sqrt(this.atomicRadius) * 3);

    // Atom's initial position is a random position on the canvas with a 100px boundary from all edges
    this.positionX = Math.floor(Math.random() * ((this.canvas.width - 100) - 100 + 1) + 100);
    this.positionY = Math.floor(Math.random() * ((this.canvas.height - 100) - 100 + 1) + 100);

    // Root mean square speed of a gaseous atom at room temperature (298 K), divided by 100
    const RMS = Math.floor(Math.sqrt(3 * 8.314 * 298 / (this.mass / 1000)) / 100);
    this.dX = RMS;
    this.dY = -RMS;

    this.draw = this.draw.bind(this);
  }

  draw() {
    const fontSize = Math.floor(this.radius * 0.75);

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
    this.ctx.font = `${fontSize}px Verdana`;
    this.ctx.fillText(this.symbol, this.positionX - (fontSize * 0.25), this.positionY, this.radius);
    this.ctx.beginPath();
    this.ctx.font = `${fontSize * 0.6}px Verdana`
    this.ctx.fillText(oxidationStateDisplay, this.positionX + (fontSize * 0.6), this.positionY - (fontSize * 0.6));
    this.ctx.closePath();
  }

  damageAtom(projectile) {
    // The goal is to make currentOxidationState = oxidationState

    // Ionisers can only hit elements with positive oxidation states
    if (projectile === 'ioniser' && this.oxidationState > 0) {
      this.currentOxidationState = this.currentOxidationState - 1;
    } 
    // Electron guns can only hit elements with negative oxidation states
    else if (projectile === 'electron' && this.oxidationState < 0) {
      this.currentOxidationState = this.currentOxidationState + 1;
    }
    // Ensure that currentOxidationState isn't changed otherwise
    else {
      this.currentOxidationState = this.currentOxidationState + 0;
    }
  }

  isAtomDefeated() {
    return this.currentOxidationState === 0;
  }

}