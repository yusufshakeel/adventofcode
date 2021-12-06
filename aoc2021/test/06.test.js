'use strict';

const sample = require('../data/06-sample');
const input = require('../data/06-input');
const { part1, part2, part2_approach2 } = require('../src/06');

test('06-01', () => {
  expect(part1(sample)).toBe(5934);
  expect(part1(input)).toBe(362740);
});

test('06-02', () => {
  expect(part2(sample)).toBe(26984457539);
  expect(part2(input)).toBe(1644874076764);
});

test('06-02-approach2', () => {
  expect(part2_approach2(sample)).toBe(26984457539);
  expect(part2_approach2(input)).toBe(1644874076764);
});
