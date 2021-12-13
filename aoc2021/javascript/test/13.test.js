'use strict';

const sample = require('../data/13-sample');
const input = require('../data/13-input');
const { part1, part2 } = require('../src/13');

test('13-01', () => {
  expect(part1(sample)).toBe(17);
  expect(part1(input)).toBe(675);
});

test('13-02', () => {
  expect(part2(sample)).toStrictEqual([
    '#####',
    '#...#',
    '#...#',
    '#...#',
    '#####',
    '.....',
    '.....'
  ]);
  expect(part2(input)).toStrictEqual([
    '#..#.####.#..#.#..#.####.####...##.####.',
    '#..#....#.#.#..#..#.#....#.......#....#.',
    '####...#..##...####.###..###.....#...#..',
    '#..#..#...#.#..#..#.#....#.......#..#...',
    '#..#.#....#.#..#..#.#....#....#..#.#....',
    '#..#.####.#..#.#..#.#....####..##..####.'
  ]);
});
