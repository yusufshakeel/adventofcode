'use strict';

function part1(input) {
  let horizontal = 0;
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const [direction, distance] = input[i];
    switch (direction) {
      case 'forward':
        horizontal += distance;
        break;
      case 'down':
        depth += distance;
        break;
      case 'up':
        depth -= distance;
        break;
    }
  }
  return horizontal * depth;
}

function part2(input) {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;
  for (let i = 0; i < input.length; i++) {
    const [direction, distance] = input[i];
    switch (direction) {
      case 'forward':
        horizontal += distance;
        depth += aim * distance;
        break;
      case 'down':
        aim += distance;
        break;
      case 'up':
        aim -= distance;
        break;
    }
  }
  return horizontal * depth;
}

module.exports = { part1, part2 };
