# AoC2021

This directory contains solutions for Advent Of Code 2021.

Code is written is JavaScript.

## Getting started

#### Install packages

```shell
npm i
```

#### To run the test

```shell
npm run test
```

#### To fix linting

```shell
npm run lint:fix
```

#### Pre commit
```shell
npm run precommit
```

### Project structure

Input files are saved inside `data` directory.

Solutions are saved inside `src` directory.

Tests are saved inside `test` directory.

Scripts are saved inside `script` directory.

#### Input files

Input files are inside `data` directory and saved in the following format.

```text
data/{dayNumber}-input.js
data/{dayNumber}-sample.js
```

So, for day 1 we will have the following input files.

```text
data/01-input.js
data/01-sample.js
```

Similarly, for day 10 we will have the following input files.

```text
data/10-input.js
data/10-sample.js
```

### Creating blank files for the day

To create a blank files for the day run the following command.

```shell
npm run create-files dayNumber
```

Example:

Run the following to create files for day 1.

```shell
npm run create-files 01
```

This will create the following files with some boilerplate code.

```text
data/01-input.js
data/01-sample.js
src/01.js
test/01.test.js
```

### Creating boilerplate file

To create boilerplate file run the following command.

```shell
npm run create-boilerplate-file filename dayNumber
```

Example:

```shell
npm run create-boilerplate-file mycode 01
```

This will create file inside `wip/mycode.js`.

The above boilerplate file will be using input files `data/01-input.js` and `data/01-sample.js`.
