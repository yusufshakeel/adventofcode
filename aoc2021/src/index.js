'use strict';

const day = 'PUT-DAY-NUMBER-HERE';

const sample = require(`../data/${day}-sample`);
const input = require(`../data/${day}-input`);

const CL = (...args) => console.log(...args);

function part1(input, expected) {
  CL('ENTERED part1');
  let result = 0;

  CL({ pass: expected === result, expected, result });
  CL('EXITING part1');
}

function part2(input, expected) {
  CL('ENTERED part2');
  let result = 0;

  CL({ pass: expected === result, expected, result });
  CL('EXITING part2');
}

const part1SampleExpected = 0;
part1(sample, part1SampleExpected);
const part1ActualExpected = 0;
part1(input, part1ActualExpected);

const part2SampleExpected = 0;
part2(sample, part2SampleExpected);
const part2ActualExpected = 0;
part2(input, part2ActualExpected);
