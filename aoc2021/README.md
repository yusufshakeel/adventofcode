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

#### Template file

Template file is inside `src` directory.

File: `src/template.js`

#### Index file

The `src/index.js` is a copy of the template file.

Before starting copy the template file to index file.

```shell
npm run clear:index
```

Create solution inside index file.

#### Saving input files

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
