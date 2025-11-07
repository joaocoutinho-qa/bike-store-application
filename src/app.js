
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync(new URL('../resources/swagger.json', import.meta.url)));
import routes from './routes/index.js'
import { errorHandler } from './middleware/error.middleware.js'

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api', routes);

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de erro
app.use(errorHandler);

export default app
