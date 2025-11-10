import express from 'express';
import cors from 'cors';
import pingRouter from './router/ping';
import diagnosesRouter from './router/diagnosesRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);

export default app;