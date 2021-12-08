'use strict';

const Iter = require('es-iter');
const { init1DArray, sumNumbers, fromCharCode, charCode } = require('../src/helpers');

/*
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

*/

const sevenSegmentDisplay = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg'
};

function part1(input) {
  // 0th index holds total number of ZEROs
  // 1st index holds total number of ONEs
  // and so on
  let countArr = init1DArray(10);

  input.forEach(line => {
    const [, fourDigitOutputPatterns] = line.split(' | ');
    fourDigitOutputPatterns.split(' ').forEach(pattern => {
      switch (pattern.length) {
        // if pattern has only 2 characters then it is 1
        case 2:
          countArr[1]++;
          break;
        // if pattern has only 3 characters then it is 7
        case 3:
          countArr[7]++;
          break;
        // if pattern has only 7 characters then it is 8
        case 7:
          countArr[8]++;
          break;
        // if pattern has only 4 characters then it is 4
        case 4:
          countArr[4]++;
          break;
      }
    });
  });

  return sumNumbers(countArr);
}

function part2(input) {
  let numbers = [];

  // this holds the number of segments needed to display a digit
  // ith index represent ith digit
  // so, 7th index holds value 3 which means we need 3 segments to show digit 7
  const numberOfSegmentsForDigit = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

  input.forEach(line => {
    const [uniqueSignalPatterns, fourDigitOutputPatterns] = line.split(' | ');

    let signalPatternGroupByNumberOfSegments = {};
    uniqueSignalPatterns.split(' ').forEach(signalPattern => {
      // grouping the signal pattern by number of segments
      signalPatternGroupByNumberOfSegments = {
        ...signalPatternGroupByNumberOfSegments,
        [signalPattern.length]: signalPatternGroupByNumberOfSegments[signalPattern.length]
          ? [...signalPatternGroupByNumberOfSegments[signalPattern.length], signalPattern]
          : [signalPattern]
      };
    });

    const segmentsOfDigit = init1DArray(10, '');

    // segments of digits 1, 4, 7, 8
    segmentsOfDigit[1] = signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[1]}`][0];
    segmentsOfDigit[4] = signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[4]}`][0];
    segmentsOfDigit[7] = signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[7]}`][0];
    segmentsOfDigit[8] = signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[8]}`][0];

    // signal wire and segment map
    let signalWireToSegmentMap = {};
    for (let seg of 'abcdefg') {
      signalWireToSegmentMap[seg] = '';
    }

    /* This will be our reference.
       We will map the signal to this.

           [0]
         aaaaaaa
        b       c [1]
    [5] b       c
         ddddddd
        e  [6]  f
    [4] e       f [2]
         ggggggg
           [3]
    */

    // difference of segments 1 and 7 will give use the segment that takes position: 0 (segment aaaaaaa)
    signalWireToSegmentMap['a'] = segmentsOfDigit[7]
      .split('')
      .find(wire => !segmentsOfDigit[1].includes(wire));

    // digit 3 must have all the segments of digit 7
    // so, find all the digits with 5 segments and then pick the one that has all the segments of digit 7
    segmentsOfDigit[3] = signalPatternGroupByNumberOfSegments[
      `${numberOfSegmentsForDigit[3]}`
    ].find(fiveSegs =>
      segmentsOfDigit[7].split('').every(segOfDigit7 => fiveSegs.includes(segOfDigit7))
    );

    // removing segments of digit 3 from the group of 5 segments digit
    signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[3]}`] =
      signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[3]}`].filter(
        v => v !== segmentsOfDigit[3]
      );

    // find intersecting segments of digit 3 and 4
    // from the result remove the segment of digit 1
    // this will give us the segment that will take position: 6 (ddddddd)
    signalWireToSegmentMap['d'] = segmentsOfDigit[3]
      .split('')
      .filter(segOfDigit3 => segmentsOfDigit[4].includes(segOfDigit3))
      .filter(commonSefOfDigit3and4 => !segmentsOfDigit[1].includes(commonSefOfDigit3and4))
      .join();

    // find segments that are in digit 4 but not in digit 3
    // this will be the segment that will take position: 5 (bbbb)
    signalWireToSegmentMap['b'] = segmentsOfDigit[4]
      .split('')
      .find(segOfDigit4 => !segmentsOfDigit[3].includes(segOfDigit4));

    // digit 0 will not have segment at position: 6 (ddddddd)
    segmentsOfDigit[0] = signalPatternGroupByNumberOfSegments[
      `${numberOfSegmentsForDigit[0]}`
    ].find(sixSegs => !sixSegs.includes(signalWireToSegmentMap['d']));

    // removing segments of digit 0 from the group of 6 segments digit
    signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[0]}`] =
      signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[0]}`].filter(
        v => v !== segmentsOfDigit[0]
      );

    // digit 9 will have all the segments of digit 3 and digit 4
    // so, from the group having segments of length 6 we pick
    // the one that has all the segments of 3 and 4
    segmentsOfDigit[9] = signalPatternGroupByNumberOfSegments[
      `${numberOfSegmentsForDigit[9]}`
    ].find(sixSegs => {
      const unionOfSegmentsOfDigit3And4 = Array.from(
        new Set([...segmentsOfDigit[3].split(''), ...segmentsOfDigit[4].split('')])
      );
      return unionOfSegmentsOfDigit3And4.every(unionOfSegOfDigit3And4 =>
        sixSegs.includes(unionOfSegOfDigit3And4)
      );
    });

    // removing segments of digit 9 from the group of 6 segments digit
    signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[9]}`] =
      signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[9]}`].filter(
        v => v !== segmentsOfDigit[9]
      );

    // remaining segment in the group is digit 6
    segmentsOfDigit[6] =
      signalPatternGroupByNumberOfSegments[`${numberOfSegmentsForDigit[6]}`].pop();

    // segment in digit 1 but not in digit 6 will take position: 1 (cccccc)
    // and similarly the remaining segment of digit 1 will take position: 2 (fffff)
    signalWireToSegmentMap['c'] = segmentsOfDigit[1]
      .split('')
      .find(segOfDigit1 => !segmentsOfDigit[6].includes(segOfDigit1));
    signalWireToSegmentMap['f'] = segmentsOfDigit[1]
      .split('')
      .find(segOfDigit1 => signalWireToSegmentMap['c'] !== segOfDigit1);

    // from the segments of digit 9 we can find the segment that will take
    // position: 3 (ggggggg)
    signalWireToSegmentMap['g'] = segmentsOfDigit[9]
      .split('')
      .find(segOfDigit9 => !Object.values(signalWireToSegmentMap).includes(segOfDigit9));

    // now we can set the last segment that will take position: 4 (eeeeee)
    signalWireToSegmentMap['e'] = 'abcdefg'
      .split('')
      .find(seg => !Object.values(signalWireToSegmentMap).includes(seg));

    // now we construct the segments to represent digits
    const segmentToDigitMap = Object.values(sevenSegmentDisplay).map(segment => {
      let requiredSegments = '';
      for (let s of segment) {
        requiredSegments += signalWireToSegmentMap[s];
      }
      return requiredSegments.split('').sort().join('');
    });

    // now we will find the 4 digits
    let digits = '';
    fourDigitOutputPatterns.split(' ').forEach(outputPattern => {
      const index = segmentToDigitMap.indexOf(outputPattern.split('').sort().join(''));
      digits += `${index}`;
    });

    numbers.push(parseInt(digits));
  });

  return sumNumbers(numbers);
}

// brute force
function part2_bruteforce(input) {
  let numbers = [];

  input.forEach(line => {
    const [uniqueSignalPatterns, fourDigitOutputPatterns] = line.split(' | ');

    for (let permutation of Iter.range(0, 7).permutations()) {
      let permutationExists = true;
      const map = {};
      for (let i = 0; i < 7; i++) {
        map[fromCharCode(charCode('a') + i)] = fromCharCode(charCode('a') + permutation[i]);
      }

      uniqueSignalPatterns.split(' ').forEach(signalPattern => {
        let permutationOfPattern = '';
        for (let character of signalPattern) {
          permutationOfPattern += map[character];
        }

        permutationOfPattern = permutationOfPattern.split('').sort().join('');

        if (!Object.values(sevenSegmentDisplay).includes(permutationOfPattern)) {
          permutationExists = false;
        }
      });

      if (permutationExists) {
        let num = '';
        fourDigitOutputPatterns.split(' ').forEach(outputPattern => {
          let permutationOfPattern = '';
          for (let character of outputPattern) {
            permutationOfPattern += map[character];
          }

          permutationOfPattern = permutationOfPattern.split('').sort().join('');

          Object.entries(sevenSegmentDisplay).forEach(entry => {
            const [key, value] = entry;
            if (value === permutationOfPattern) {
              num += `${key}`;
            }
          });
        });
        numbers.push(parseInt(num));
      }
    }
  });

  return sumNumbers(numbers);
}

module.exports = { part1, part2, part2_bruteforce };
