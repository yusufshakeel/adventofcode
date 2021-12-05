'use strict';

/*
0,0
  +------ x (col of 2d array)
  |
  |
  y
  (row of 2d array)
*/

const getMapSize = input => {
  let mapSize = 0;
  input.forEach(entry => {
    const max = Math.max(...entry);
    if (max > mapSize) {
      mapSize = max;
    }
  });
  // adding 1 here because if max value of x or y coordinate is say 2 then we will need 3x3 array
  mapSize = mapSize + 1;
  // we will create 2d array of size equal to mapSize
  return mapSize;
};

const createMap = mapSize => {
  const map = [];
  for (let r = 0; r < mapSize; r++) {
    const row = [];
    for (let c = 0; c < mapSize; c++) {
      row.push(0);
    }
    map.push(row);
  }
  return map;
};

const getFrequencyOfTheCoordinates = (map, mapSize) => {
  let frequency = {};
  for (let r = 0; r < mapSize; r++) {
    for (let c = 0; c < mapSize; c++) {
      const count = map[r][c];
      const sum = frequency[count] || 0;
      frequency = {
        ...frequency,
        [count]: sum + 1
      };
    }
  }
  return frequency;
};

const numberOfCoordinatesWithAtLeastTwoOverlappingLines = frequencyOfTheCoordinates => {
  return Object.entries(frequencyOfTheCoordinates)
    .filter(entry => {
      const [overlappingNLines] = entry;
      return +overlappingNLines > 1;
    })
    .reduce((sum, entry) => {
      const [, numberOfTimesNLinesOverlapped] = entry;
      return sum + numberOfTimesNLinesOverlapped;
    }, 0);
};

function part1(input) {
  let mapSize = getMapSize(input);
  let map = createMap(mapSize);

  input.forEach(entry => {
    const [x1, y1, x2, y2] = entry;
    if (x1 === x2) {
      // moving along y i.e. row will change
      const { s, e } = y1 > y2 ? { e: y1, s: y2 } : { e: y2, s: y1 };
      for (let i = s; i <= e; i++) {
        map[i][x1]++;
      }
    } else if (y1 === y2) {
      // moving along x i.e. column will change
      const { s, e } = x1 > x2 ? { e: x1, s: x2 } : { e: x2, s: x1 };
      for (let i = s; i <= e; i++) {
        map[y1][i]++;
      }
    }
  });

  let pointsFrequency = getFrequencyOfTheCoordinates(map, mapSize);
  return numberOfCoordinatesWithAtLeastTwoOverlappingLines(pointsFrequency);
}

function part2(input) {
  let mapSize = getMapSize(input);
  let map = createMap(mapSize);

  // eslint-disable-next-line complexity
  input.forEach(entry => {
    const [x1, y1, x2, y2] = entry;
    if (x1 === x2) {
      // moving along y i.e. row will change
      const { s, e } = y1 > y2 ? { e: y1, s: y2 } : { e: y2, s: y1 };
      for (let i = s; i <= e; i++) {
        map[i][x1]++;
      }
    } else if (y1 === y2) {
      // moving along x i.e. column will change
      const { s, e } = x1 > x2 ? { e: x1, s: x2 } : { e: x2, s: x1 };
      for (let i = s; i <= e; i++) {
        map[y1][i]++;
      }
    } else if (x1 < x2) {
      // moving diagonally left to right
      const yIncr = y1 < y2 ? 1 : -1;
      for (let x = x1, y = y1; x <= x2; x++, y += yIncr) {
        map[y][x]++;
      }
    } else {
      // moving diagonally right to left
      const yIncr = y1 < y2 ? 1 : -1;
      for (let x = x1, y = y1; x >= x2; x--, y += yIncr) {
        map[y][x]++;
      }
    }
  });

  let pointsFrequency = getFrequencyOfTheCoordinates(map, mapSize);
  return numberOfCoordinatesWithAtLeastTwoOverlappingLines(pointsFrequency);
}

module.exports = { part1, part2 };
