import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { USER_DATABASE, PASSWORD_DATABASE, DATABASE, PORT, NODE_ENV } =
  process.env;

const connectionString = `mongodb+srv://${USER_DATABASE}:${PASSWORD_DATABASE}@$studio-core-api.npz1eci.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

const uri =
  NODE_ENV === 'development'
    ? `mongodb://mongo:27017/${DATABASE}`
    : connectionString;

/**
 * Connect to the database
 * @returns void
 * @async
 * @function connectToDatabase
 * @throws {Error} Database connection error
 */
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

/**
 * Start the server
 * @returns void
 * @async
 * @function startServer
 */
async function startServer(): Promise<void> {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
