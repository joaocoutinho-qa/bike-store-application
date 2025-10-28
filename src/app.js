const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');
const routes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api', routes);

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de erro
app.use(errorHandler);

module.exports = app;
