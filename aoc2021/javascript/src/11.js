'use strict';

function part1(input) {
  let map = [];
  input.forEach(line => {
    let row = [];
    for (let n of line) {
      row.push(+n);
    }
    map.push(row);
  });

  const tr = map.length;
  const tc = map[0].length;
  let totalFlashes = 0;

  const willFlash = (r, c) => {
    totalFlashes++;

    // this can no longer flash for current step
    map[r][c] = -1;

    // inc adjacent octopuses by 1
    const rowLim = [-1, 0, 1];
    const colLim = [-1, 0, 1];
    for (let lr of rowLim) {
      for (let lc of colLim) {
        const sr = r + lr;
        const sc = c + lc;
        if (sr >= 0 && sr < tr && sc >= 0 && sc < tc && map[sr][sc] !== -1) {
          map[sr][sc]++;
          if (map[sr][sc] > 9) {
            willFlash(sr, sc);
          }
        }
      }
    }
  };

  for (let step = 1; step <= 100; step++) {
    // inc by 1
    for (let r = 0; r < tr; r++) {
      for (let c = 0; c < tc; c++) {
        map[r][c]++;
      }
    }

    // will flash
    for (let r = 0; r < tr; r++) {
      for (let c = 0; c < tc; c++) {
        if (map[r][c] > 9) {
          willFlash(r, c);
        }
      }
    }

    // reset
    for (let r = 0; r < tr; r++) {
      for (let c = 0; c < tc; c++) {
        if (map[r][c] === -1) {
          map[r][c] = 0;
        }
      }
    }
  }
  return totalFlashes;
}

function part2(input) {
  let map = [];
  input.forEach(line => {
    let row = [];
    for (let n of line) {
      row.push(+n);
    }
    map.push(row);
  });

  const tr = map.length;
  const tc = map[0].length;

  const willFlash = (r, c) => {
    // this can no longer flash for current step
    map[r][c] = -1;

    // inc adjacent octopuses by 1
    const rowLim = [-1, 0, 1];
    const colLim = [-1, 0, 1];
    for (let lr of rowLim) {
      for (let lc of colLim) {
        const sr = r + lr;
        const sc = c + lc;
        if (sr >= 0 && sr < tr && sc >= 0 && sc < tc && map[sr][sc] !== -1) {
          map[sr][sc]++;
          if (map[sr][sc] > 9) {
            willFlash(sr, sc);
          }
        }
      }
    }
  };

  let step = 0;
  let allFlashTogether = false;
  while (!allFlashTogether) {
    step++;
    // inc by 1
    for (let r = 0; r < tr; r++) {
      for (let c = 0; c < tc; c++) {
        map[r][c]++;
      }
    }

    // will flash
    for (let r = 0; r < tr; r++) {
      for (let c = 0; c < tc; c++) {
        if (map[r][c] > 9) {
          willFlash(r, c);
        }
      }
    }

    // reset
    let hasAllOctopusesFlashed = true;
    for (let r = 0; r < tr; r++) {
      for (let c = 0; c < tc; c++) {
        if (map[r][c] === -1) {
          map[r][c] = 0;
        } else {
          hasAllOctopusesFlashed = false;
        }
      }
    }
    allFlashTogether = !!hasAllOctopusesFlashed;
  }
  return step;
}

module.exports = { part1, part2 };
