/* Element data is sourced from the periodic-table package (https://www.npmjs.com/package/periodic-table)

  For now, I will likely use only elements 1-100 since their properties are more-or-less established (especially the transuranic elements)

  Relevant data I will extract from each element:
  atomicNumber, symbol, name, atomicRadius, atomicMass, cpkHexColor (to color the atom), electronegativity, oxidation states
*/

const periodicTable = require('periodic-table');

// Test how the package works
// const helium = periodicTable.elements.Helium;
// console.log(helium);

// Single out the nobleGases (heals the player on contact)
const nobleGases = ['Helium', 'Neon', 'Argon', 'Krypton', 'Xenon', 'Radon'];

export default class Atom {
  constructor(cpkHexColor, atomicNumber, symbol, atomicRadius, atomicMass, electronegativity, oxidationState) {
    this.cpkHexColor = cpkHexColor;
    this.atomicNumber = atomicNumber;
    this.symbol = symbol;
    this.atomicRadius = atomicRadius;
    this.atomicMass = atomicMass;
    this.electronegativity = electronegativity;
    this.oxidationState = oxidationState;
  }
}