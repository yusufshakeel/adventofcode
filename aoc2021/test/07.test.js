'use strict';

const sample = require('../data/07-sample');
const input = require('../data/07-input');
const { part1, part2 } = require('../src/07');

test('07-01', () => {
  expect(part1(sample)).toBe(37);
  expect(part1(input)).toBe(342730);
});

test('07-02', () => {
  expect(part2(sample)).toBe(168);
  expect(part2(input)).toBe(92335207);
});
