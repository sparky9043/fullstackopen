import express, { Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnosis } from '../types';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses: Diagnosis[] = diagnosesService.getDiagnoses();
  res.json(diagnoses);
});

export default diagnosesRouter;