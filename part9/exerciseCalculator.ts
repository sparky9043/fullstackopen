interface TrainingStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const exercisesCalculator = (trainingDaysArray: number[]): TrainingStats => {
  const periodLength: number = trainingDaysArray.length;
  const trainingDays: number = trainingDaysArray.filter(number => number !== 0).length;

  console.log(periodLength, trainingDays)

  return { 
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2,
    ratingDescription: 'not too bad but could be better',
    target: 2,
    average: 1.9285714285714286
  }
}

// console.log(
  exercisesCalculator([2, 0, 2, 0, 2, 0, 2])
// )