import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { NewPatient, Patient, PatientWithoutSSN } from '../types';
import middleware from '../utils/middleware';
// import utils from '../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const savedPatients = patientService.getPatientsWithoutSSN();
  res.json(savedPatients);
});

// patientRouter.get('/:id', (_req, res) => {

// });

patientRouter.post('/', middleware.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const savedPatient = patientService.addPatient(req.body);
  res.json(savedPatient);
});

export default patientRouter;