import express, { Response } from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSSN } from '../types';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const savedPatients = patientService.getPatientsWithoutSSN();
  res.json(savedPatients);
});

export default patientRouter;