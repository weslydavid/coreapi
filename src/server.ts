/* eslint-disable require-jsdoc */
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const {
  USER_DATA_BASE,
  PASSWORD_DATA_BASE,
  DATA_BASE,
  PORT
} = process.env;

const connectionString =
`mongodb+srv://${USER_DATA_BASE}:${PASSWORD_DATA_BASE}@${DATA_BASE}/?retryWrites=true&w=majority`;
  

async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
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

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

async function startServer(): Promise<void> {
  await connectToDatabase();
  startExpressServer();
}

startServer();
