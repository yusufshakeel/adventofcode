'use strict';

const {
  init1DArray,
  init2DArray,
  LOGGING,
  sumNumbers,
  charCode,
  fromCharCode,
  sortingNumbers,
  sortingStrings
} = require('../../src/helpers');

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

describe('sumNumbers', () => {
  test('Should return sum', () => {
    expect(sumNumbers([1, 2, 3])).toBe(6);
    expect(sumNumbers([1, 2, -3])).toBe(0);
    expect(sumNumbers([-1, 2, -3])).toBe(-2);
  });
});

describe('charCode', () => {
  test('Should return character code', () => {
    expect(charCode('a')).toBe(97);
  });
});

describe('fromCharCode', () => {
  test('Should return character from charCode', () => {
    expect(fromCharCode(97)).toBe('a');
  });
});

describe('sortingNumbers', () => {
  describe('Default sorting in ascending order', () => {
    test('Should return sorted result', () => {
      expect(sortingNumbers([1, 3, 2, 5, 4, 6])).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('When sorting in descending order', () => {
    test('Should return sorted result', () => {
      expect(sortingNumbers([1, 3, 2, 5, 4, 6], true)).toStrictEqual([6, 5, 4, 3, 2, 1]);
    });
  });
});

describe('sortingStrings', () => {
  describe('Default sorting in ascending order', () => {
    describe('When sorting characters', () => {
      test('Should return sorted result', () => {
        expect(sortingStrings(['a', 'c', 'b', 'd', 'a'])).toStrictEqual(['a', 'a', 'b', 'c', 'd']);
      });
    });

    describe('When sorting strings', () => {
      test('Should return sorted result', () => {
        expect(sortingStrings(['acb', 'aba', 'abb', 'aab'])).toStrictEqual([
          'aab',
          'aba',
          'abb',
          'acb'
        ]);
      });
    });
  });

  describe('When sorting in descending order', () => {
    describe('When sorting characters', () => {
      test('Should return sorted result', () => {
        expect(sortingStrings(['a', 'c', 'b', 'd', 'a'], true)).toStrictEqual([
          'd',
          'c',
          'b',
          'a',
          'a'
        ]);
      });
    });

    describe('When sorting strings', () => {
      test('Should return sorted result', () => {
        expect(sortingStrings(['acb', 'aba', 'abb', 'aab'], true)).toStrictEqual([
          'acb',
          'abb',
          'aba',
          'aab'
        ]);
      });
    });
  });
});
