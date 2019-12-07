// Elemental properties
const periodicTable = require('../assets/data/periodicTable');
import Atom from './atom';

export const generateAtom = (canvas, ctx) => {
  // Choose a random element between Hydrogen (1) and Uranium (92)
  const element = periodicTable.numbers[Math.floor(Math.random() * (92 - 1 + 1) + 1)];
  const oxidationState = chooseOxidationState(element);
  const CMYKColour = hexToCMYK(element.cpkHexColor);

  return new Atom(canvas, ctx, element.cpkHexColor, CMYKColour, element.atomicNumber, element.symbol, element.atomicMass, element.atomicRadius, oxidationState);
}

function chooseOxidationState(element) {
  if (typeof element.oxidationStates === "number") {
    return element.oxidationStates;
  }
  else {
    const oxidationStateNums = element.oxidationStates.split(', ');
    let oxidationState = parseInt(oxidationStateNums[Math.floor(Math.random() * oxidationStateNums.length)], 10);
    while (oxidationState === 0 && !['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(element.symbol)) {
      oxidationState = parseInt(oxidationStateNums[Math.floor(Math.random() * oxidationStateNums.length)], 10);
    }
    return oxidationState;
  }
}

// Adapted from http://www.javascripter.net/faq/hex2cmyk.htm
// Purpose is to determine a textColor for the symbol and oxidation state
function hexToCMYK(hexColour) {
  const hex = hexColour.substring(1, 7); // hexColour has format '#abcdef' - want to ignore the #

  const R = parseInt(hex.substring(0, 2), 16);
  const G = parseInt(hex.substring(2, 4), 16);
  const B = parseInt(hex.substring(4, 6), 16);

  const C = 1 - (R / 255);
  const M = 1 - (G / 255);
  const Y = 1 - (B / 255);

  const CMYK = [C, M, Y, Math.min(C, Math.min(M, Y))];
  return CMYK;
}
