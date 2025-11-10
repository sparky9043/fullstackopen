import express from 'express';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const savedPatients = patientService.getPatients();
  res.json(savedPatients);
});

export default patientRouter;