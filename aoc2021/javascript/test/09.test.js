'use strict';

const sample = require('../data/09-sample');
const input = require('../data/09-input');
const { part1, part1_approach2, part2, part2_approach2 } = require('../src/09');

test('09-01', () => {
  expect(part1(sample)).toBe(15);
  expect(part1(input)).toBe(496);
});

test('09-01 approach2', () => {
  expect(part1_approach2(sample)).toBe(15);
  expect(part1_approach2(input)).toBe(496);
});

test('09-02', () => {
  expect(part2(sample)).toBe(1134);
  expect(part2(input)).toBe(902880);
});

test('09-02 part2_approach2', () => {
  expect(part2_approach2(sample)).toBe(1134);
  expect(part2_approach2(input)).toBe(902880);
});
