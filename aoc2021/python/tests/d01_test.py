import os
from src.d01 import part1, part2

curr_dir = os.path.dirname(__file__)
sample = []
for line in open(curr_dir + '/../data/01-sample.txt'):
  sample.append(int(line.strip()))

input = []
for line in open(curr_dir + '/../data/01-input.txt'):
  input.append(int(line.strip()))

def test_part1():
  assert part1(sample) == 7
  assert part1(input) == 1184

def test_part2():
  assert part2(sample) == 5
  assert part2(input) == 1158