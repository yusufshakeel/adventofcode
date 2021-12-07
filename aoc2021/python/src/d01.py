def sum(input):
  num = input[0]
  count = 0
  for i in input[1:]:
    if i > num:
      count += 1
      num = i
    else:
      num = i
  return count

def trio(input):
  enrichedInput = []
  for i in range(len(input)-2):
    enrichedInput.append(input[i]+input[i+1]+input[i+2])
  return enrichedInput

def part1(input):
  return sum(input)

def part2(input):
  return sum(trio(input))