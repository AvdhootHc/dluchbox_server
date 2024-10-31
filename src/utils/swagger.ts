const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
      description: 'API Documentation using Swagger',
      contact: {
        name: 'Kingsley',
      },
      servers: [`http://localhost:${process.env.PORT}`],
    },
  },
  // Path to the API routes
  apis: [
    'src/routes/v1/user.routes.ts',
    'src/routes/v1/tour.routes.ts',
    'src/routes/v1/sellerAgent.routes.ts',
    'src/routes/v1/property.routes.ts',
    'src/routes/v1/city.routes.ts',
  ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
