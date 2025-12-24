import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { Entry, EntryWithoutId, NewPatient, Patient, PatientWithoutSSN } from '../types';
import middleware from '../utils/middleware';
// import utils from '../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientWithoutSSN[]>) => {
  const savedPatients = patientService.getPatients();
  res.json(savedPatients);
});

patientRouter.get('/:id', (req, res) => {
  const savedPatient = patientService.getPatientById(req.params.id);

  if (savedPatient) {
    res.json(savedPatient);
  } else {
    throw new Error('patient not found');
  }
});

patientRouter.post('/', middleware.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const savedPatient = patientService.addPatient(req.body);
  res.json(savedPatient);
});

/*
  To continue next time:
  1. make sure the id is parsed properly to identify patient
  2. learn how to parse request.params.id along with how to type Response in express

*/

patientRouter.post('/:id/entries', middleware.newEntryParser, (req: Request<unknown, unknown, EntryWithoutId> , _res: Response<Entry>) => {
  patientService.addEntryToPatient(req.body);

  // const savedPatient = patientService.getPatientById(req.params.id);
  // console.log(savedPatient);
});

export default patientRouter;