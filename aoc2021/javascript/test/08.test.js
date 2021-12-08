'use strict';

const sample = require('../data/08-sample');
const input = require('../data/08-input');
const { part1, part2, part2_bruteforce } = require('../src/08');

test('08-01', () => {
  expect(part1(sample)).toBe(26);
  expect(part1(input)).toBe(512);
});

test('08-02', () => {
  expect(part2(sample)).toBe(61229);
  expect(part2(input)).toBe(1091165);
});

test('08-02 part2_bruteforce', () => {
  expect(part2_bruteforce(sample)).toBe(61229);

  // not running the following as it takes a lot of time
  // expect(part2_bruteforce(input)).toBe(1091165);
});
