import express, { Response } from 'express';
import patientService from '../services/patientService';
import { PatientWithoutSSN } from '../types';
import utils from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const savedPatients = patientService.getPatientsWithoutSSN();
  res.json(savedPatients);
});

patientRouter.post('/', (req, res) => {
  const newPatientData = utils.toNewPatient(req.body);
  const savedPatient = patientService.addPatient(newPatientData);
  res.json(savedPatient);
});

export default patientRouter;