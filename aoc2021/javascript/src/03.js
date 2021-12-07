'use strict';

function part1(input) {
  let map = [];
  const length = input[0].length;

  // filling the map
  for (let i = 0; i < length; i++) {
    map[i] = [0, 0];
  }

  // count 0s and 1s in the ith index for each binary number
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < input.length; j++) {
      const bit = parseInt(input[j][i]);
      map[i][bit] = map[i][bit] + 1;
    }
  }

  let gamma = '';
  let epsilon = '';

  // construct gamma and epsilon binary number
  for (let i = 0; i < length; i++) {
    const [zeros, ones] = map[i];
    if (zeros > ones) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }

  // binary to decimal
  const g = parseInt(gamma, 2);
  const e = parseInt(epsilon, 2);

  return { map, gamma, epsilon, result: g * e };
}

function part2(input) {
  // this will change the Nth bit of the binary numbers in the list
  const changeNthBitOfBinaryNumbers = (nth, bit, list) => {
    const newList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i][nth] === bit) {
        newList.push(list[i]);
      }
    }
    return newList;
  };

  // finding the o2 binary number
  let list = [...input];
  for (let i = 0; i < input[i].length; i++) {
    if (list.length === 1) {
      break;
    }
    let map = part1(list).map;
    const [zeros, ones] = map[i];
    if (zeros > ones) {
      list = changeNthBitOfBinaryNumbers(i, '0', list);
    } else if (ones > zeros) {
      list = changeNthBitOfBinaryNumbers(i, '1', list);
    } else {
      list = changeNthBitOfBinaryNumbers(i, '1', list);
    }
  }
  const o2Bin = list[0];
  const o2 = parseInt(o2Bin, 2);

  // finding the co2 binary number
  list = [...input];
  for (let i = 0; i < input[i].length; i++) {
    if (list.length === 1) {
      break;
    }
    let map = part1(list).map;
    const [zeros, ones] = map[i];
    if (zeros > ones) {
      list = changeNthBitOfBinaryNumbers(i, '1', list);
    } else if (ones > zeros) {
      list = changeNthBitOfBinaryNumbers(i, '0', list);
    } else {
      list = changeNthBitOfBinaryNumbers(i, '0', list);
    }
  }
  const co2Bin = list[0];
  const co2 = parseInt(co2Bin, 2);

  return { o2: o2Bin, co2: co2Bin, result: o2 * co2 };
}

module.exports = { part1, part2 };
