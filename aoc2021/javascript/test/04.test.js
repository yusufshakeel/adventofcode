'use strict';

const sample = require('../data/04-sample');
const input = require('../data/04-input');
const { part1, part2 } = require('../src/04');

test('04-01', () => {
  expect(part1(sample)).toBe(4512);
  expect(part1(input)).toBe(33348);
});

test('04-02', () => {
  expect(part2(sample)).toBe(1924);
  expect(part2(input)).toBe(8112);
});
