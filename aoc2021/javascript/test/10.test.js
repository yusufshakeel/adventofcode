'use strict';

const sample = require('../data/10-sample');
const input = require('../data/10-input');
const { part1, part2 } = require('../src/10');

test('10-01', () => {
  expect(part1(sample)).toBe(26397);
  expect(part1(input)).toBe(392139);
});

test('10-02', () => {
  expect(part2(sample)).toBe(288957);
  expect(part2(input)).toBe(4001832844);
});
