import 'dotenv/config';
import express from 'express';
import { connectToMongo } from './infrastructure/database/mongoConnection';
import setTodoRoutes from '@presentation/routes/todoRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './swaggerConfig';
import setAlbumRoutes from '@presentation/routes/albumRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  try {
    await connectToMongo();
    console.log('Connected to MongoDB');

    setTodoRoutes(app);
    setAlbumRoutes(app); // Register album routes

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();