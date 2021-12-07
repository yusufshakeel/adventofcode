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

const inputFileTemplate = fs.readFileSync(`${__dirname}/templates/data-file-template.txt`, 'utf8');
const srcFileTemplate = fs.readFileSync(`${__dirname}/templates/src-file-template.txt`, 'utf8');
const testFileTemplate = fs
  .readFileSync(`${__dirname}/templates/test-file-template.txt`, 'utf8')
  .replace(/\${day}/gi, day);

function createFiles() {
  try {
    fs.writeFileSync(inputFile, inputFileTemplate);
    console.log('File created', inputFile);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    fs.writeFileSync(sampleFile, inputFileTemplate);
    console.log('File created', sampleFile);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    fs.writeFileSync(srcFile, srcFileTemplate);
    console.log('File created', srcFile);
  } catch (err) {
    console.log(err);
    return;
  }

  try {
    fs.writeFileSync(testFile, testFileTemplate);
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
