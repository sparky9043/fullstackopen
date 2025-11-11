import express, { Response } from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSSN } from '../types';
import toNewPatient from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const savedPatients = patientService.getPatientsWithoutSSN();
  res.json(savedPatients);
});

patientRouter.post('/', (req, res) => {
  const newPatientData = toNewPatient(req.body);
  const savedPatient = patientService.addPatient(newPatientData);
  res.json(savedPatient);
});

export default patientRouter;