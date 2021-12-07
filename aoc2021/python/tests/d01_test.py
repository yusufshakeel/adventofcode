from src.d01 import part1, part2

def test_part1():
  assert part1({"a":1,"b":2}) == { "a": 1, "b": 2 }, "Failed 01-01"

def test_part2():
  assert part2(1) == 1, "Failed 01-02"