import express from 'express';
import cors from 'cors';
import pingRouter from './router/ping';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/ping', pingRouter);

export default app;