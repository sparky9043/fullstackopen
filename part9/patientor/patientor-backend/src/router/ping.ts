import express from 'express';
import logger from '../utils/logger';

const pingRouter = express.Router();

pingRouter.get('/', (_req, res) => {
  logger.info('someone pinged here');
  res.send('pong');
});

export default pingRouter;