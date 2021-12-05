'use strict';

const { init1DArray, init2DArray, LOGGING } = require('../../src/helpers');

describe('LOGGING', () => {
  describe('When logging is enabled', () => {
    test('Should log', () => {
      const log = LOGGING();
      log('Just logging');
      expect(log).toStrictEqual(expect.any(Function));
    });
  });

  describe('When logging is disabled', () => {
    test('Should not log', () => {
      const log = LOGGING(false);
      log('This will not be logged');
      expect(log).toStrictEqual(expect.any(Function));
    });
  });
});

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
