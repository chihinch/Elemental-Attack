// Taken from https://github.com/andrejewski/periodic-table due to 
// an issue with the importation of data in the original package

var path = require('path');
var data = require('./periodicTable.json');

var elements = data.reduce(function (obj, element) {
  obj[element.name] = element
  return obj
}, {})

var symbols = data.reduce(function (obj, element) {
  obj[element.symbol] = element
  return obj
}, {})

var numbers = data.reduce(function (obj, element) {
  obj[element.atomicNumber] = element
  return obj
}, {})

module.exports = {
  jsonFile: path.join(__dirname, 'periodicTable.json'),

  all: function all() {
    return data;
  },
  elements: elements,
  symbols: symbols,
  numbers: numbers
}