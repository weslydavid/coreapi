/* eslint-disable require-jsdoc */
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/errorHandlerMiddleware';
dotenv.config();

const app = express();
const { USER_DATABASE, PASSWORD_DATABASE, DATABASE, PORT, NODE_ENV } =
  process.env;

const connectionString = `mongodb+srv://${USER_DATABASE}:${PASSWORD_DATABASE}@$studio-core-api.npz1eci.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

const uri =
  NODE_ENV === 'development'
    ? `mongodb://mongo:27017/${DATABASE}`
    : connectionString;

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log('DB \x1b[34m%s\x1b[0m', 'Online!!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to the database:', error.message);
    }
    process.exit(1);
  }
}

function startExpressServer(): void {
  app.use(express.json());
  app.use('/api', routes);
  app.use(errorMiddleware());

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

async function startServer(): Promise<void> {
  await connectToDatabase();
  startExpressServer();
}

startServer();
