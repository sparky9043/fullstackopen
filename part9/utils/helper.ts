interface bmiBio {
  height: number,
  weight: number,
}

interface TrainingDays {
  target: number,
  days: number[],
}

const parseArgumentsBmi = (args: string[]): bmiBio => {
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

const parseArgumentsTraining = (args: string[]): TrainingDays => {
  if (args.length < 4) throw new Error('not enough arguments')

  const [first, ...rest] = args.slice(2)

  if (!isNaN(Number(first)) && rest.every(member => !isNaN(Number(member)))) {
    const target: number = Number(first)
    const days: number[] = rest.map(s => Number(s))

    return {
      target,
      days,
    }
  } else {
    throw new Error('Some of your arguments are not numbers!')
  }
}

export default { parseArgumentsBmi, parseArgumentsTraining }