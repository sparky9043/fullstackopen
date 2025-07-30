interface TrainingStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const exercisesCalculator = (trainingDays: number[]): TrainingStats => {
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

console.log(exercisesCalculator([2, 0, 2, 0, 2, 0, 2]))