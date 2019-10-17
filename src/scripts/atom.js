/* Element data is sourced from the periodic-table package (https://www.npmjs.com/package/periodic-table)

  For now, I will likely use only elements 1-100 since their properties are more-or-less established (especially the transuranic elements)

  (16-Oct yeah.. maybe scratch that. The package doesn't have much info past bismuth (83), not even uranium >:( )

  Relevant data I will extract from each element:
  atomicNumber, symbol, name, atomicRadius, atomicMass, cpkHexColor (to color the atom), electronegativity, oxidation states, standardState?

  (Maybe standardState won't be needed since I'll have the atoms bounce around like balls)

  (Maybe not the electronegativity since I need it to pick an oxidation state)
*/

// const periodicTable = require('periodic-table');

// Test how the package works
// const helium = periodicTable.elements.Helium;
// console.log(helium);

export default class Atom {
  constructor(canvas, ctx, cpkHexColor, symbol, atomicRadius, atomicMass, oxidationState) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.cpkHexColor = cpkHexColor;
    this.symbol = symbol;
    this.atomicRadius = atomicRadius;
    this.atomicMass = atomicMass;
    this.oxidationState = oxidationState;

    this.currentOxidationState = 0;
    this.nobleGas = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(symbol)
    // Atoms are represented by circles whose radii are (for now) set equal to
    // sqrt(this.atomicRadius) * 3
    this.radius = Math.sqrt(this.atomicRadius) * 3;

    // Atom is generated at a random position on the x-axis on the top of the screen
    this.positionX = Math.floor(Math.random() * canvas.width);
    this.positionY = 0;

    // Speed of the atom
    this.dX = 2;
    this.dY = -2;

    this.drawAtom = this.drawAtom.bind(this);
  }

  drawAtom() {
    // Will have to change the centre of the circle as atoms fly around the canvas
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.cpkHexColor;
    this.fillStyle = this.cpkHexColor;
    this.ctx.arc(100, 100, this.radius, 0, 2 * Math.PI, true);
    this.ctx.stroke();
    this.ctx.fill();
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

  isAtomDefeated() {
    return this.oxidationState === this.currentOxidationState;
  }

}