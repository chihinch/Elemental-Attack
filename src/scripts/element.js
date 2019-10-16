/* Element data is sourced from the periodic-table package (https://www.npmjs.com/package/periodic-table)

  For now, I will likely use only elements 1-100 since their properties are more-or-less established (especially the transuranic elements)

  Relevant data I will extract from each element:
  atomicNumber, symbol, name, atomicRadius, atomicMass, cpkHexColor (to color the atom), electronegativity, oxidation states, standardState?

  (Maybe standardState won't be needed since I'll have the atoms bounce around like balls)

  (Maybe not the electronegativity since I need it to pick an oxidation state)
*/

const periodicTable = require('periodic-table');

// Test how the package works
// const helium = periodicTable.elements.Helium;
// console.log(helium);

export default class Atom {
  constructor(canvas, ctx, cpkHexColor, atomicNumber, symbol, atomicRadius, atomicMass, electronegativity, oxidationState) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.cpkHexColor = cpkHexColor;
    this.atomicNumber = atomicNumber;
    this.symbol = symbol;
    this.atomicRadius = atomicRadius;
    this.atomicMass = atomicMass;
    this.oxidationState = oxidationState;
    this.currentOxidationState = 0;
    this.nobleGas = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(this.symbol)
  }

  drawAtom() {
    const radius = this.atomicRadius 

    this.ctx.strokeStyle = this.cpkHexColor;
    this.fillStyle = this.cpkHexColor;
    // Will have to change the centre of the circle as atoms fly around the canvas
    // this.ctx.beginPath(100, 100, );

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