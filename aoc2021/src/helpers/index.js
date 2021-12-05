'use strict';

const LOGGING = (enabled = true) => {
  return enabled ? (...args) => console.log(...args) : () => {};
};

function init1DArray(size, seed = 0) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(seed);
  }
  return array;
}

function init2DArray(totalRows, totalColumns, seed = 0) {
  const array = [];
  for (let r = 0; r < totalRows; r++) {
    const row = [];
    for (let c = 0; c < totalColumns; c++) {
      row[c] = seed;
    }
    array.push(row);
  }
  return array;
}

module.exports = { init1DArray, init2DArray, LOGGING };
