'use strict';

const sample = require('../data/05-sample');
const input = require('../data/05-input');
const { part1, part2 } = require('../src/05');

test('05-01', () => {
  expect(part1(sample)).toBe(5);
  expect(part1(input)).toBe(4745);
});

test('05-02', () => {
  expect(part2(sample)).toBe(12);
  expect(part2(input)).toBe(18442);
});
