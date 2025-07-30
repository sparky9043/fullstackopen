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

console.log(calculateBmi(173, 95))