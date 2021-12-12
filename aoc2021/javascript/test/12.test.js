'use strict';

const sample = require('../data/12-sample');
const sample2 = require('../data/12-02-sample');
const sample3 = require('../data/12-03-sample');
const input = require('../data/12-input');
const { part1, part2 } = require('../src/12');

test('12-01', () => {
  expect(part1(sample)).toBe(10);
  expect(part1(sample2)).toBe(19);
  expect(part1(sample3)).toBe(226);
  expect(part1(input)).toBe(3576);
});

test('12-02', () => {
  expect(part2(sample)).toBe(36);
  expect(part2(sample2)).toBe(103);
  expect(part2(sample3)).toBe(3509);

  // runs for too long
  // expect(part2(input)).toBe(84271);
});
