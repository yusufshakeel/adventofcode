'use strict';

const sample = require('../data/01-sample');
const input = require('../data/01-input');
const { sum, trioSum } = require('../src/01');

test('01-01', () => {
  expect(sum(sample)).toBe(7);
  expect(sum(input)).toBe(1184);
});

test('01-02', () => {
  expect(sum(trioSum(sample))).toBe(5);
  expect(sum(trioSum(input))).toBe(1158);
});
