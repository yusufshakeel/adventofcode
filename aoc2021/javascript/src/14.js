'use strict';

// works good for lower number of days.
// brute force
function part1(input) {
  let seed = '';
  let pairs = {};

  input.forEach(line => {
    if (line.includes('->')) {
      const [pair, result] = line.split('->');
      pairs = { ...pairs, [pair.trim()]: result.trim() };
    } else if (line.length) {
      seed = line.trim();
    }
  });

  let polymer = String(seed);
  for (let step = 1; step <= 10; step++) {
    let newPolymer = String(polymer);
    for (let i = 0; i < polymer.length - 1; i++) {
      const pair = `${polymer[i]}${polymer[i + 1]}`;
      const result = pairs[pair];
      if (result) {
        newPolymer = newPolymer.substr(0, i * 2 + 1) + result + newPolymer.substr(i * 2 + 1);
      }
    }
    polymer = String(newPolymer);
  }

  let freq = {};
  polymer.split('').forEach(ch => {
    const count = freq[ch] ?? 0;
    freq = { ...freq, [ch]: count + 1 };
  });

  const freqValues = Object.values(freq);
  const high = Math.max(...freqValues);
  const low = Math.min(...freqValues);
  return high - low;
}

function part2(input) {
  let seed = '';
  let pairs = {};
  input.forEach(line => {
    if (line.includes('->')) {
      const [pair, result] = line.split('->');
      pairs = { ...pairs, [pair.trim()]: result.trim() };
    } else if (line.length) {
      seed = line.trim();
    }
  });

  let polymerPairs = {};

  // init
  for (let i = 0; i < seed.length - 1; i++) {
    const pair = seed[i] + seed[i + 1];
    const count = polymerPairs[pair] ?? 0;
    polymerPairs = { ...polymerPairs, [pair]: count + 1 };
  }

  // counting pairs
  for (let step = 1; step <= 40; step++) {
    let newPolymerPairs = {};
    Object.entries(polymerPairs).forEach(entry => {
      const [pair] = entry;
      const count = polymerPairs[pair] ?? 0;
      const newPair1 = pair[0] + pairs[pair];
      const newPair2 = pairs[pair] + pair[1];
      newPolymerPairs = {
        ...newPolymerPairs,
        [newPair1]: (newPolymerPairs[newPair1] ?? 0) + count,
        [newPair2]: (newPolymerPairs[newPair2] ?? 0) + count
      };
    });
    polymerPairs = { ...newPolymerPairs };
  }

  let freq = {};
  Object.entries(polymerPairs).forEach(entry => {
    const [pair, count] = entry;
    const sum = freq[pair[0]] ?? 0;
    freq = {
      ...freq,
      [pair[0]]: sum + count
    };
  });
  freq[seed[seed.length - 1]] += 1;

  const freqValues = Object.values(freq);
  const high = Math.max(...freqValues);
  const low = Math.min(...freqValues);
  return high - low;
}

module.exports = { part1, part2 };
