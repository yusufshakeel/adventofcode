'use strict';

const sample = require('../data/14-sample');
const input = require('../data/14-input');
const { part1, part2 } = require('../src/14');

test('14-01', () => {
  expect(part1(sample)).toBe(1588);
  expect(part1(input)).toBe(2549);
});

test('14-02', () => {
  expect(part2(sample)).toBe(2188189693529);
  expect(part2(input)).toBe(2516901104210);
});
