'use strict';

const countHash = map => {
  let folds = 0;
  const tr = map.length;
  const tc = map[0].length;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      if (map[r][c] === '#') {
        folds++;
      }
    }
  }
  return folds;
};

const reading = input => {
  let coords = [];
  let instructions = [];

  let rows = 0;
  let columns = 0;

  input.forEach(line => {
    if (line.startsWith('fold along ')) {
      instructions.push(line.split('fold along ')[1]);
    } else if (line.length !== 0) {
      const [x, y] = line.split(',').map(v => +v);
      coords.push([x, y]);
      if (x > columns) {
        columns = x;
      }
      if (y > rows) {
        rows = y;
      }
    }
  });

  return { coords, instructions, rows, columns };
};

function part1(input) {
  let { coords, instructions, rows: ty, columns: tx } = reading(input);

  // init map with .
  let map = [];
  for (let y = 0; y <= ty; y++) {
    const row = [];
    for (let x = 0; x <= tx; x++) {
      row.push('.');
    }
    map.push(row);
  }

  // fill #
  coords.forEach(coord => {
    const [x, y] = coord;
    map[y][x] = '#';
  });

  // only 1st instruction
  let newtx, newty;
  let hashAfterNthFold = [];
  // eslint-disable-next-line complexity
  [instructions[0]].forEach(instruction => {
    let newMap = [];
    const [along, coord] = instruction.split('=');

    if (along === 'y') {
      const y = +coord;
      newty = y - 1;

      // copy first half
      for (let ny = 0; ny <= newty; ny++) {
        const row = [];
        for (let nx = 0; nx <= tx; nx++) {
          row.push(map[ny][nx]);
        }
        newMap.push(row);
      }

      // copy 2nd half
      for (let ny = y + 1; ny <= ty; ny++) {
        for (let nx = 0; nx <= tx; nx++) {
          const dist = ny - y;
          newMap[y - dist][nx] = newMap[y - dist][nx] === '#' ? newMap[y - dist][nx] : map[ny][nx];
        }
      }

      // count
      hashAfterNthFold.push(countHash(newMap));
    } else {
      const x = +coord;
      newtx = x - 1;

      // copy first half
      for (let ny = 0; ny <= ty; ny++) {
        const row = [];
        for (let nx = 0; nx <= newtx; nx++) {
          row.push(map[ny][nx]);
        }
        newMap.push(row);
      }

      // copy 2nd half
      for (let ny = 0; ny <= ty; ny++) {
        for (let nx = x + 1; nx <= tx; nx++) {
          const dist = nx - x;
          newMap[ny][x - dist] = newMap[ny][x - dist] === '#' ? newMap[ny][x - dist] : map[ny][nx];
        }
      }

      // count
      hashAfterNthFold.push(countHash(newMap));
    }
  });

  return hashAfterNthFold[0];
}

function part2(input) {
  let { coords, instructions, rows: ty, columns: tx } = reading(input);

  // init map with .
  let map = [];
  for (let y = 0; y <= ty; y++) {
    const row = [];
    for (let x = 0; x <= tx; x++) {
      row.push('.');
    }
    map.push(row);
  }

  // fill #
  coords.forEach(coord => {
    const [x, y] = coord;
    map[y][x] = '#';
  });

  // all instructions
  let newtx, newty;
  // eslint-disable-next-line complexity
  instructions.forEach(instruction => {
    let newMap = [];
    const [along, coord] = instruction.split('=');
    if (along === 'y') {
      const y = +coord;
      newty = y - 1;

      // copy first half
      for (let ny = 0; ny <= newty; ny++) {
        const row = [];
        for (let nx = 0; nx <= tx; nx++) {
          row.push(map[ny][nx]);
        }
        newMap.push(row);
      }

      // copy 2nd half
      for (let ny = y + 1; ny <= ty; ny++) {
        for (let nx = 0; nx <= tx; nx++) {
          const dist = ny - y;
          newMap[y - dist][nx] = newMap[y - dist][nx] === '#' ? newMap[y - dist][nx] : map[ny][nx];
        }
      }
    } else {
      const x = +coord;
      newtx = x - 1;

      // copy first half
      for (let ny = 0; ny <= ty; ny++) {
        const row = [];
        for (let nx = 0; nx <= newtx; nx++) {
          row.push(map[ny][nx]);
        }
        newMap.push(row);
      }

      // copy 2nd half
      for (let ny = 0; ny <= ty; ny++) {
        for (let nx = x + 1; nx <= tx; nx++) {
          const dist = nx - x;
          newMap[ny][x - dist] = newMap[ny][x - dist] === '#' ? newMap[ny][x - dist] : map[ny][nx];
        }
      }
    }

    // update map
    map = [];
    for (let y = 0; y < newMap.length; y++) {
      const row = [];
      for (let x = 0; x < newMap[0].length; x++) {
        row.push(newMap[y][x]);
      }
      map.push(row);
    }
    ty = map.length - 1;
    tx = map[0].length - 1;
  });

  // beautify
  let result = [];
  for (let r = 0; r < map.length; r++) {
    result.push(map[r].join(''));
  }

  return result;
}

module.exports = { part1, part2 };
