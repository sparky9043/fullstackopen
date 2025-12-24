import express, { Request, Response } from 'express';
import diagnosesService from '../services/diagnosesService';
import { Diagnosis } from '../types';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses: Diagnosis[] = diagnosesService.getDiagnoses();
  res.json(diagnoses);
});

diagnosesRouter.get('/:code', (req: Request, res: Response<Diagnosis>) => {
  const diagnosis: Diagnosis = diagnosesService.getDiagnosisByCode(req.params.code);
  res.json(diagnosis);
});

export default diagnosesRouter;