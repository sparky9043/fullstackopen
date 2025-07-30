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

export default { parseArguments }