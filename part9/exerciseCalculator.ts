import helper from './utils/helper';

interface TrainingStats {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const exercisesCalculator = (dailyExerciseHours: number[], target: number): TrainingStats => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(number => number !== 0).length;
  const totalTrainingHours = dailyExerciseHours.reduce((prev, curr) => prev + curr, 0);
  const average = totalTrainingHours / periodLength;
  const difference = average - target;
  const success = difference > 0;
  const ratingDescriptions = [
    'gotta try harder!',
    'not too bad but could be better',
    'great work! you went above and beyond!',
  ];

  let rating;
  if (success) {
    rating = 3;
  } else if (Math.abs(difference) <= 0.5) {
    rating = 2;
  } else if (Math.abs(difference) <= 1) {
    rating = 1;
  } else {
    throw new Error('invalid rating');
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target,
    average,
  };
};

if (require.main === module) {
  try {
    const { target, days } = helper.parseArgumentsTraining(process.argv);
    console.log(exercisesCalculator(days, target));
  } catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  } 
}