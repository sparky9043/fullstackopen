import express from 'express';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send('patients route connected');
});

export default patientRouter;