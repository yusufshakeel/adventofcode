'use strict';

const { init1DArray, init2DArray } = require('../../src/helpers');

describe('init1DArray', () => {
  describe('When using default seed', () => {
    test('Should return array', () => {
      expect(init1DArray(3)).toStrictEqual([0, 0, 0]);
    });
  });

  describe('When using custom seed', () => {
    test('Should return array', () => {
      expect(init1DArray(3, '-')).toStrictEqual(['-', '-', '-']);
    });
  });
});

describe('init2DArray', () => {
  describe('When using default seed', () => {
    test('Should return array', () => {
      expect(init2DArray(3, 3)).toStrictEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });
  });

  describe('When using custom seed', () => {
    test('Should return array', () => {
      expect(init2DArray(3, 3, '-')).toStrictEqual([
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]);
    });
  });
});
