'use strict';

const { sortingNumbers } = require('../src/helpers');

const CHARACTERS_PAIR = {
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>'
};

const POINTS_FOR_CORRUPT_CHARACTER = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const POINTS_FOR_INCOMPLETE_CHARACTER = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};

const openingCharacters = Object.keys(CHARACTERS_PAIR);

function part1(input) {
  let sum = 0;
  input.forEach(line => {
    const characters = line.split('');
    const stack = [];
    for (let character of characters) {
      if (openingCharacters.includes(character)) {
        stack.push(character);
      } else {
        const characterFromStack = stack.pop();
        if (CHARACTERS_PAIR[characterFromStack] !== character) {
          sum += POINTS_FOR_CORRUPT_CHARACTER[character];
          break;
        }
      }
    }
  });
  return sum;
}

function part2(input) {
  let scores = [];
  input.forEach(line => {
    const characters = line.split('');
    const stack = [];
    let isCorruptLine = false;
    for (let character of characters) {
      if (openingCharacters.includes(character)) {
        stack.push(character);
      } else {
        const characterFromStack = stack.pop();
        if (CHARACTERS_PAIR[characterFromStack] !== character) {
          isCorruptLine = true;
          break;
        }
      }
    }
    if (!isCorruptLine) {
      let lineScore = 0;
      while (stack.length) {
        const characterFromStack = stack.pop();
        const neededCharacter = CHARACTERS_PAIR[characterFromStack];
        lineScore = lineScore * 5 + POINTS_FOR_INCOMPLETE_CHARACTER[neededCharacter];
      }
      scores.push(lineScore);
    }
  });
  const sortedScore = sortingNumbers(scores);
  return sortedScore[Math.floor(sortedScore.length / 2)];
}

module.exports = { part1, part2 };
