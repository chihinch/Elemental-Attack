// Elemental properties
const periodicTable = require('../assets/data/periodicTable');
import Atom from './atom';

export const generateAtom = (canvas, ctx) => {
  // Choose a random element between Hydrogen (1) and Uranium (92)
  const element = periodicTable.numbers[Math.floor(Math.random() * (92 - 1 + 1) + 1)];
  const oxidationState = chooseOxidationState(element);

  return new Atom(canvas, ctx, element.cpkHexColor, element.atomicNumber, element.symbol, element.atomicMass, element.atomicRadius, oxidationState);
}

function chooseOxidationState(element) {
  let oxidationStateNums;

  if (typeof element.oxidationStates === "number") {
    oxidationStateNums = [element.oxidationStates];
  }
  else {
    oxidationStateNums = element.oxidationStates.split(', ');
  }

  let oxidationState = oxidationStateNums[Math.floor(Math.random() * oxidationStateNums.length)];
  while (oxidationState === 0 && !['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(element.symbol)) {
    oxidationState = oxidationStateNums[Math.floor(Math.random() * oxidationStateNums.length)];
  }

  return oxidationState;
}
