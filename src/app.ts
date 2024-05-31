/* eslint-disable require-jsdoc */
import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/errorHandlerMiddleware';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', routes);
app.use(errorMiddleware());
app.use('/', routes);

export default app;
