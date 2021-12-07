'use strict';

function LOGGING(enabled = true) {
  return enabled ? (...args) => console.log(...args) : () => {};
}

function init1DArray(size, seed = 0) {
  return Array(size).fill(seed);
}

function init2DArray(totalRows, totalColumns, seed = 0) {
  return Array(totalRows).fill(Array(totalColumns).fill(seed));
}

function sumNumbers(arrayOfNumbers) {
  return arrayOfNumbers.reduce((sum, value) => sum + value, 0);
}

module.exports = { init1DArray, init2DArray, LOGGING, sumNumbers };
