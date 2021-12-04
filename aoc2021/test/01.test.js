'use strict';

const sample = require('../data/01-sample');
const input = require('../data/01-input');
const { part1, part2 } = require('../src/01');

test('01-01', () => {
  expect(part1(sample)).toBe(7);
  expect(part1(input)).toBe(1184);
});

test('01-02', () => {
  expect(part2(sample)).toBe(5);
  expect(part2(input)).toBe(1158);
});
