'use strict';
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const argv = process.argv;

const day = argv[2];

if (!day) {
  throw new Error('Day missing!');
}

const inputFilePath = `${__dirname}/../data`;
const srcFilePath = `${__dirname}/../src`;
const testFilePath = `${__dirname}/../test`;

const inputFile = `${inputFilePath}/${day}-input.js`;
const sampleFile = `${inputFilePath}/${day}-sample.js`;
const srcFile = `${srcFilePath}/${day}.js`;
const testFile = `${testFilePath}/${day}.test.js`;

function createFiles() {
  const inputData = `'use strict';
module.exports = [];
`;

  const srcData = `'use strict';

function part1(input) {
  return input;
}

function part2(input) {
  return input;
}

module.exports = { part1, part2 };
`;

  const testFileData = `'use strict';

const sample = require('../data/${day}-sample');
const input = require('../data/${day}-input');
const { part1, part2 } = require('../src/${day}');

test('${day}-01', () => {
  expect(part1(sample)).toBe();
  expect(part1(input)).toBe();
});

test('${day}-02', () => {
  expect(part2(sample)).toBe();
  expect(part2(input)).toBe();
});
`;

  try {
    fs.writeFileSync(inputFile, inputData);
    console.log('File created', inputFile);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    fs.writeFileSync(sampleFile, inputData);
    console.log('File created', sampleFile);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    fs.writeFileSync(srcFile, srcData);
    console.log('File created', srcFile);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    fs.writeFileSync(testFile, testFileData);
    console.log('File created', testFile);
  } catch (err) {
    console.log(err);
    return;
  }
  console.log('Done.');
}

if (fs.existsSync(inputFile)) {
  console.log('File exists.');
  rl.question('Files will be overwritten. Do you want to continue? [y/n] ', userInput => {
    if (!['y', 'Y'].includes(userInput)) {
      console.log('Exiting... Bye.');
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    } else {
      createFiles();
      rl.close();
    }
  });
} else {
  createFiles();
  rl.close();
}
