interface bmiBio {
  height: number,
  weight: number,
}

const parseArguments = (args: string[]): bmiBio => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const height = Number(args[2])
  const weight = Number(args[3])

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    }
  } else {
    throw new Error('You must enter a number')
  }
}


const calculateBmi = (height: number, weight: number): string => {

  const heightInMeters = height / 100
  const bmi: number = weight / (heightInMeters * heightInMeters);

  if (bmi >= 30) {
    return 'Obese';
  } else if (bmi >= 25) {
    return 'Overweight';
  } else if (bmi >= 18.5) {
    return 'Normal Range';
  } else {
    return 'Underweight';
  }
}

console.log(
  parseArguments(process.argv)
)

// console.log(
  // calculateBmi(process.argv)
// )