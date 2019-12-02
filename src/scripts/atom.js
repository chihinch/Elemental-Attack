export default class Atom {
  constructor(canvas, ctx, cpkHexColor, atomicNumber, symbol, atomicMass, atomicRadius, oxidationState) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.ref = `atom-${Math.random()}`;

    this.cpkHexColor = cpkHexColor;
    this.atomicNumber = atomicNumber;
    this.symbol = symbol;
    this.mass = atomicMass;
    this.atomicRadius = atomicRadius;
    this.currentOxidationState = oxidationState;

    this.nobleGas = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(symbol);
    this.radius = Math.ceil(Math.sqrt(this.atomicRadius) * 3);

    // Atom's initial position is a random position on the canvas with a 100px boundary from all edges
    this.positionX = Math.floor(Math.random() * ((this.canvas.width - 100) - 100 + 1) + 100);
    this.positionY = Math.floor(Math.random() * ((this.canvas.height - 100) - 100 + 1) + 100);

    // Atom's speed based on root mean square speed of a gaseous atom at room temperature (298 K)
    const RMS = Math.sqrt(3 * 8.314 * 298 / (this.mass / 1000));
    const scaledRMS = Math.ceil((RMS / 1000) + 1);
    this.dX = scaledRMS;
    this.dY = -scaledRMS;

    this.draw = this.draw.bind(this);
    this.reverseDirection = this.reverseDirection.bind(this);
    this.damage = this.damage.bind(this);
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
    this.ctx.fillStyle = '#42464d';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${fontSize}px Verdana`;
    this.ctx.fillText(this.symbol, this.positionX - (fontSize * 0.25), this.positionY, this.radius);
    this.ctx.beginPath();
    this.ctx.font = `${fontSize * 0.6}px Verdana`
    this.ctx.fillText(oxidationStateDisplay, this.positionX + (fontSize * 0.6), this.positionY - (fontSize * 0.6));
    this.ctx.closePath();
  }

  reverseDirection() {
    this.dX = -(this.dX);
    this.dY = -(this.dY);
  }

  damage(projectile) {
    // // The goal is to make currentOxidationState = oxidationState

    // // Ionisers can only hit elements with positive oxidation states
    // if (projectile === 'ioniser' && this.oxidationState > 0) {
    //   this.currentOxidationState = this.currentOxidationState - 1;
    // } 
    // // Electron guns can only hit elements with negative oxidation states
    // else if (projectile === 'electron' && this.oxidationState < 0) {
    //   this.currentOxidationState = this.currentOxidationState + 1;
    // }
    // // Ensure that currentOxidationState isn't changed otherwise
    // else {
    //   this.currentOxidationState = this.currentOxidationState + 0;
    // }

    switch (projectile) {
      case 'ioniser':
        this.currentOxidationState--;
        break;
      case 'electron':
        this.currentOxidationState++;
        break;
      default:
        return;
    }
  }

  isAtomDefeated() {
    return this.currentOxidationState === 0;
  }

}