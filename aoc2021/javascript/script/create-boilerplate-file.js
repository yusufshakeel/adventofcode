'use strict';
const fs = require('fs');
const readline = require('readline');

const argv = process.argv;

const filename = argv[2];

if (!filename) {
  throw new Error('Filename missing!');
}

const day = argv[3];

if (!day) {
  throw new Error('Day missing!');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const indexFilePath = `${__dirname}/../wip/${filename}.js`;
const indexFileTempate = fs
  .readFileSync(`${__dirname}/templates/boilerplate-file-template.txt`, 'utf8')
  .replace(/\${day}/gi, day);

function createFiles() {
  try {
    fs.writeFileSync(indexFilePath, indexFileTempate);
    console.log('File created', indexFilePath);
  } catch (err) {
    console.log(err);
    return;
  }

  console.log('Done.');
}

if (fs.existsSync(indexFilePath)) {
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
