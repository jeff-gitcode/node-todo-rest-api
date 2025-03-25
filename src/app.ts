import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './swaggerConfig';
import setTodoRoutes from '@presentation/routes/todoRoutes';
import setAlbumRoutes from '@presentation/routes/albumRoutes';
import setAuthRoutes from '@presentation/routes/authRoutes';

const app = express();

// Middleware
app.use(express.json());

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes
setTodoRoutes(app);
setAlbumRoutes(app);
setAuthRoutes(app);

export default app;