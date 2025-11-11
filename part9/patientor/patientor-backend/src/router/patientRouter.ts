/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express, { Response } from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSSN } from '../types';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const savedPatients = patientService.getPatientsWithoutSSN();
  res.json(savedPatients);
});

patientRouter.post('/', (req, res) => {
  const savedPatient = patientService.addPatient(req.body);
  res.json(savedPatient);
});

export default patientRouter;