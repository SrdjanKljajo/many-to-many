const numbers = [1, 3, 1, 2, 8, 4]

const indexOfTwoNumbersInArrayWithSum7 = (numbers, sum) => {
  const result = []
  for (let number of numbers) {
    if (result[number]) {
      return [
        `index:  ${numbers.indexOf(sum - number)}, index: ${numbers.indexOf(
          number
        )}`,
      ]
    }
    result[sum - number] = true
  }
  return false
}

console.log(indexOfTwoNumbersInArrayWithSum7(numbers, 7))

const sumOfTwoNumbersInArray = (numbers, sum) => {
  const result = []
  for (let number of numbers) {
    if (result[number]) {
      return [sum - number, number]
    }
    result[sum - number] = true
  }
  return false
}

console.log(sumOfTwoNumbersInArray(numbers, 7))
