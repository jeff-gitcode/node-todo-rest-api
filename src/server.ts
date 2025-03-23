import express from 'express';
import mongoose from 'mongoose';
import { connectToMongo } from './infrastructure/database/mongoConnection';
import setTodoRoutes from '@presentation/routes/todoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB');

    setTodoRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();