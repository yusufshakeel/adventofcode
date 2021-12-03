'use strict';

const sample = require('../data/03-sample');
const input = require('../data/03-input');
const { part1, part2 } = require('../src/03');

test('03-01', () => {
  expect(part1(sample).result).toBe(198);
  expect(part1(input).result).toBe(3429254);
});

test('03-02', () => {
  expect(part2(sample).result).toBe(230);
  expect(part2(input).result).toBe(5410338);
});
