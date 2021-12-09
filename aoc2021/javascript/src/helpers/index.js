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

function charCode(ch) {
  return `${ch}`.charCodeAt(0);
}

function fromCharCode(charCode) {
  return String.fromCharCode(charCode);
}

function sortingNumbers(arr, desc = false) {
  const order = desc ? (a, b) => b - a : (a, b) => a - b;
  return arr.sort(order);
}

function sortingStrings(arr, desc = false) {
  const order = desc ? (a, b) => b.localeCompare(a) : (a, b) => a.localeCompare(b);
  return arr.sort(order);
}

module.exports = {
  init1DArray,
  init2DArray,
  LOGGING,
  sumNumbers,
  charCode,
  fromCharCode,
  sortingNumbers,
  sortingStrings
};
