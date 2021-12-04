'use strict';

function sum(data) {
  const [first, ...rest] = data;

  let count = 0;
  let high = first;
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] > high) {
      count++;
      high = rest[i];
    } else {
      high = rest[i];
    }
  }
  return count;
}

function trioSum(data) {
  let newData = [];
  for (let i = 0; i < data.length - 2; i++) {
    newData.push(data[i] + data[i + 1] + data[i + 2]);
  }
  return newData;
}

function part1(input) {
  return sum(input);
}

function part2(input) {
  return sum(trioSum(input));
}

module.exports = { part1, part2 };
