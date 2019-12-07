export default class Atom {
  constructor(canvas, ctx, cpkHexColor, CMYKColor, atomicNumber, symbol, atomicMass, atomicRadius, oxidationState) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.ref = `atom-${Math.random()}`;

    this.cpkHexColor = cpkHexColor;
    this.textColor = CMYKColor[3] < 0.3 ? "#42464d" : "#ffffff";
    this.atomicNumber = atomicNumber;
    this.symbol = symbol;
    this.atomicMass = atomicMass;
    this.currentOxidationState = oxidationState;

    this.nobleGas = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(symbol);
    this.radius = Math.ceil(atomicRadius / 5);

    // Atom's initial position is a random position on the canvas with a 200 px boundary from all edges
    this.positionX = Math.floor(Math.random() * ((this.canvas.width - 200) - 200 + 1) + 200);
    this.positionY = Math.floor(Math.random() * ((this.canvas.height - 200) - 200 + 1) + 200);

    // Atom's speed based on root mean square speed of a gaseous atom at room temperature (298 K), scaled to be reasonably drawn on canvas
    const RMS = Math.log(Math.sqrt((3 * 8.314 * 298) / (atomicMass / 1000))) - 3;
    this.dX = RMS;
    this.dY = -RMS;

    this.draw = this.draw.bind(this);
    this.damage = this.damage.bind(this);
    this.reverseDirection = this.reverseDirection.bind(this);
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

    if (this.nobleGas) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.textColor;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = `${fontSize}px 'Nunito'`;
      this.ctx.fillText(this.symbol, this.positionX, this.positionY, this.radius);
    }
    else {
    this.ctx.beginPath();
      this.ctx.fillStyle = this.textColor;
      this.ctx.textAlign = 'end';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = `${fontSize}px 'Nunito'`;
    this.ctx.fillText(this.symbol, this.positionX, this.positionY, this.radius);

    this.ctx.beginPath();
      this.ctx.textAlign = 'start';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = `${fontSize * 0.6}px 'Nunito'`
    this.ctx.fillText(oxidationStateDisplay, this.positionX, this.positionY - (fontSize * 0.5));
    }
  }

  damage(projectile) {
    switch (projectile) {
      case 'ioniser':
        this.currentOxidationState++;
        break;
      case 'electron':
        this.currentOxidationState--;
        break;
      default:
        return;
    }
  }

  isAtomDefeated() {
    return this.currentOxidationState === 0;
  }

  reverseDirection() {
    this.dX = -this.dX;
    this.dY = -this.dY;
  }

}