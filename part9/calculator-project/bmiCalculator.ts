import helper from './utils/helper';

const calculateBmi = (height: number, weight: number): string => {

  const heightInMeters = height / 100;
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
};

if (require.main === module) {
  try {
    const { height, weight } = helper.parseArgumentsBmi(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;