'use strict';

const sample = require('../data/0202-sample');
const input = require('../data/0202-input');
const { part1, part2 } = require('../src/02');

test('02-01', () => {
  expect(part1(sample)).toBe(150);
  expect(part1(input)).toBe(1524750);
});

test('02-02', () => {
  expect(part2(sample)).toBe(900);
  expect(part2(input)).toBe(1592426537);
});
