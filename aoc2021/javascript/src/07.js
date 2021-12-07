'use strict';
const { sumNumbers } = require('../src/helpers');

function minSum(dict) {
  let result = sumNumbers(dict[Object.keys(dict)[0]]);
  Object.entries(dict).forEach(entry => {
    const [, arrOfDistances] = entry;
    const sum = sumNumbers(arrOfDistances);
    if (sum < result) {
      result = sum;
    }
  });
  return result;
}

function part1(input) {
  const pos = [...input];
  let dict = {};
  for (let i = 0; i < pos.length; i++) {
    dict[pos[i]] = [];
    for (let j = 0; j < pos.length; j++) {
      dict[pos[i]].push(Math.abs(pos[i] - pos[j]));
    }
  }
  return minSum(dict);
}

function part2(input) {
  const pos = [...input];
  let dict = {};
  const max = Math.max(...pos);
  const min = Math.min(...pos);
  for (let i = min; i <= max; i++) {
    dict[i] = [];
    for (let j = 0; j < pos.length; j++) {
      const move = Math.abs(i - pos[j]);
      dict[i].push((move * (move + 1)) / 2);
    }
  }
  return minSum(dict);
}

module.exports = { part1, part2 };
