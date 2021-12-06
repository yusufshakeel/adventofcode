'use strict';

const { sumNumbers, init1DArray } = require('./helpers');

// this is brute force - works for smaller number of days
// won't work for 256 days
function part1(input) {
  const fishTimers = [...input];
  for (let day = 1; day <= 80; day++) {
    const totalFishes = fishTimers.length;
    for (let f = 0; f < totalFishes; f++) {
      if (fishTimers[f] === 0) {
        fishTimers[f] = 6;
        fishTimers.push(8);
      } else {
        fishTimers[f]--;
      }
    }
  }
  return fishTimers.length;
}

// here we are saving the number of fishes in a 1d array as per fish timer (0 to 8)
// the array index denotes the fish timer and the value at the index denotes the number of fishes
function part2(input) {
  const fishTimers = [...input];

  // size for init1DArray is 9 as timer is from 0 to 8
  let map = init1DArray(9);
  for (let i = 0; i < fishTimers.length; i++) {
    map[fishTimers[i]]++;
  }

  for (let day = 1; day <= 256; day++) {
    // size for init1DArray is 9 as timer is from 0 to 8
    let mapOfTheDay = init1DArray(9);
    map.forEach((value, index) => {
      const nthTimer = index;
      const totalFishesWithNthTimer = value;
      if (nthTimer === 0) {
        // this fish will give birth
        mapOfTheDay[6] += totalFishesWithNthTimer;
        mapOfTheDay[8] += totalFishesWithNthTimer;
      } else {
        // fish will not give birth but its timer will reduce
        mapOfTheDay[nthTimer - 1] += totalFishesWithNthTimer;
      }
    });
    map = [...mapOfTheDay];
  }

  return sumNumbers(map);
}

function part2_approach2(input) {
  const fishTimers = [...input];

  // size for init1DArray is 9 as timer is from 0 to 8
  let map = init1DArray(9);
  for (let i = 0; i < fishTimers.length; i++) {
    map[fishTimers[i]]++;
  }

  // left shifting map array content by 1 position and incrementing 6th and 8th position with 0th position value
  // day 0 map: [0, 1, 1, 2, 1, 0, 0, 0, 0]
  // day 1 map: [1, 1, 2, 1, 0, 0, 0, 0, 0]
  // day 2 map: [1, 2, 1, 0, 0, 0, 1, 0, 1]
  // day 3 map: [2, 1, 0, 0, 0, 1, 1, 1, 1]
  // day 4 map: [1, 0, 0, 0, 1, 1, 3, 1, 2]
  // and so on...
  // Note! when doing left shift fill the 8th element of the map array with 0
  // then add the value of 0th position to 6th and 8th position

  for (let day = 1; day <= 256; day++) {
    // left shifting map array content by 1 position and filling the 8th position with 0
    let mapOfTheDay = [...[...map].splice(1), 0];
    const numberOfFishesWith0thTimer = map[0];

    // adding the 0th position value of map array to the 6th and 8th position of mapOfTheDay array
    // 0th position value indicates the total number of fishes that gave birth
    mapOfTheDay[6] += numberOfFishesWith0thTimer; // fishes that gave birth
    mapOfTheDay[8] += numberOfFishesWith0thTimer; // newborn fishes

    map = [...mapOfTheDay];
  }

  return sumNumbers(map);
}

module.exports = { part1, part2, part2_approach2 };
