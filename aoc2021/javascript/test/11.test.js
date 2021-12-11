'use strict';

const sample = require('../data/11-sample');
const input = require('../data/11-input');
const { part1, part2 } = require('../src/11');

test('11-01', () => {
  expect(part1(sample)).toBe(1656);
  expect(part1(input)).toBe(1757);
});

test('11-02', () => {
  expect(part2(sample)).toBe(195);
  expect(part2(input)).toBe(422);
});
