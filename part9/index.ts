import express from 'express';
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi,
    });
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises: number[] = req.body.daily_exercises;

  if (daily_exercises.length === 0 || !daily_exercises) {
    console.log('wrong exercises');
    return res.status(400).json({ error: 'malformatted parameter' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target: number = req.body.target;
  if (!target || isNaN(Number(target))) {
    console.log('wrong target');
    return res.status(400).json({ error: 'malformatted parameter' });
  }

  const result = exerciseCalculator(daily_exercises, target);

  return res.status(201).json(result);
});

const PORT: number = 3001;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});