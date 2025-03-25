import 'dotenv/config';
import app from './app';
import { connectToMongo } from './infrastructure/database/mongoConnection';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();
