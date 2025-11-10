import express from 'express';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.send('diagnoses retrieved');
});

export default diagnosesRouter;