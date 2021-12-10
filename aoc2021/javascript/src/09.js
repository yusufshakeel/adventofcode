'use strict';

// eslint-disable-next-line complexity
const { sortingNumbers } = require('../src/helpers');
const Queue = require('../src/helpers/queue');

function init(input) {
  const tc = input[0].length;
  const tr = input.length;
  const map = [];

  for (let r = 0; r < tr; r++) {
    const row = [];
    for (let c = 0; c < tc; c++) {
      row.push(+input[r][c]);
    }
    map.push(row);
  }

  return { tr, tc, map };
}

// eslint-disable-next-line complexity
function part1(input) {
  const { tr, tc, map } = init(input);

  let riskScore = 0;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      const v = map[r][c];

      /*
          (r-1, c-1)  (r-1, c)  (r-1, c+1)
          (r,   c-1)   (r,c)    (r,   c+1)
          (r+1, c-1)  (r+1, c)  (r+1, c+1)

          allowed is up, left, bottom, right
       */

      const upRow = r - 1;
      const downRow = r + 1;
      const leftCol = c - 1;
      const rightCol = c + 1;

      let isSearchValid = true;
      // row search
      for (let sr = upRow; sr <= downRow; sr++) {
        if (sr >= 0 && sr < tr && sr !== r && v >= map[sr][c]) {
          isSearchValid = false;
        }
      }
      // col search
      for (let sc = leftCol; sc <= rightCol && isSearchValid; sc++) {
        if (sc >= 0 && sc < tc && sc !== c && v > map[r][sc]) {
          isSearchValid = false;
        }
      }

      if (isSearchValid) {
        riskScore += v + 1;
      }
    }
  }
  return riskScore;
}

function part1_approach2(input) {
  const { tr, tc, map } = init(input);

  let riskScore = 0;
  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      const v = map[r][c];

      /*
          (r-1, c-1)  (r-1, c)  (r-1, c+1)
          (r,   c-1)   (r,c)    (r,   c+1)
          (r+1, c-1)  (r+1, c)  (r+1, c+1)

          allowed is up, left, bottom, right
       */

      let isSearchValid = true;
      const rowRange = [-1, 0, 1, 0];
      const colRange = [0, 1, 0, -1];
      for (let i = 0; i < 4; i++) {
        const sr = r + rowRange[i];
        const sc = c + colRange[i];
        if (sr >= 0 && sr < tr && sc >= 0 && sc < tc && map[r][c] >= map[sr][sc]) {
          isSearchValid = false;
        }
      }

      if (isSearchValid) {
        riskScore += v + 1;
      }
    }
  }
  return riskScore;
}

// eslint-disable-next-line complexity
function part2(input) {
  const { tr, tc, map } = init(input);

  let basinSizes = [];
  let visited = new Set();

  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      if (!visited.has(`${r},${c}`) && map[r][c] !== 9) {
        let basinSize = 0;
        let queue = [];
        queue.push([r, c]);
        while (queue.length) {
          const [ir, ic] = queue.splice(0, 1)[0];
          if (visited.has(`${ir},${ic}`)) {
            continue;
          }
          visited.add(`${ir},${ic}`);
          basinSize++;

          const upRow = ir - 1;
          const downRow = ir + 1;
          const leftCol = ic - 1;
          const rightCol = ic + 1;

          // row search
          for (let sr = upRow; sr <= downRow; sr++) {
            if (sr >= 0 && sr < tr && sr !== ir && map[sr][ic] !== 9) {
              queue.push([sr, ic]);
            }
          }
          // col search
          for (let sc = leftCol; sc <= rightCol; sc++) {
            if (sc >= 0 && sc < tc && sc !== ic && map[ir][sc] !== 9) {
              queue.push([ir, sc]);
            }
          }
        }
        basinSizes.push(basinSize);
      }
    }
  }
  basinSizes = sortingNumbers(basinSizes, true);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

// eslint-disable-next-line complexity
function part2_approach2(input) {
  const { tr, tc, map } = init(input);

  let basinSizes = [];
  let visited = new Set();

  for (let r = 0; r < tr; r++) {
    for (let c = 0; c < tc; c++) {
      if (!visited.has(`${r},${c}`) && map[r][c] !== 9) {
        let basinSize = 0;
        let queue = new Queue();
        queue.enqueue([r, c]);
        while (queue.size()) {
          const [ir, ic] = queue.dequeue();
          if (visited.has(`${ir},${ic}`)) {
            continue;
          }
          visited.add(`${ir},${ic}`);
          basinSize++;

          // this will take only top, left, right, bottom locations from the current location.
          const points = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
          ];
          points.forEach(delta => {
            const [dr, dc] = delta;
            const sr = ir + dr;
            const sc = ic + dc;
            if (sr >= 0 && sr < tr && sc >= 0 && sc < tc && map[sr][sc] !== 9) {
              queue.enqueue([sr, sc]);
            }
          });
        }
        basinSizes.push(basinSize);
      }
    }
  }
  basinSizes = sortingNumbers(basinSizes, true);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}

module.exports = { part1, part1_approach2, part2, part2_approach2 };
