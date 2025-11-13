import { NextFunction, Request, Response } from 'express';
import utils from './utils';
import { z } from 'zod';
import logger from './logger';

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    utils.newPatientDataSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    logger.info('Error', error.message);
    res.status(400).json({ error: error.issues });
  } else if (error instanceof Error) {
    logger.error('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
  next();
};

export default { newPatientParser, errorHandler };