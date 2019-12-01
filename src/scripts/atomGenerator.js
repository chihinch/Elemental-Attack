// Elemental properties
const periodicTable = require('../assets/data/periodicTable');
import Atom from './atom';

export const generateAtom = (canvas, ctx) => {
  // Choose a random element between Hydrogen (1) and Uranium (92)
  const element = periodicTable.numbers[Math.floor(Math.random() * (92 - 1 + 1) + 1)];

  let oxidationState;

  // Element has only one oxidation state
  if (typeof element.oxidationStates === 'number') {
    oxidationState = element.oxidationStates;
  }
  // Element has multiple oxidation states: choose one based on its electronegativity
  else {
    const oxStates = element.oxidationStates.split(", ");
    if (element.electronegativity >= 2.50) {
      oxidationState = parseInt(oxStates[oxStates.length - 1]);
    }
    else {
      oxidationState = parseInt(oxStates[0]);
    }
  }

  return new Atom(canvas, ctx, element.cpkHexColor, element.symbol, element.atomicRadius, oxidationState);
}
