import { AppDataSource } from './data-source';
import * as express from 'express';
import * as dotenv from 'dotenv';
var cors = require('cors');
import { Request, Response } from 'express';
import { userRouter } from './routes/v1/user.routes';
import 'reflect-metadata';
import { errorHandler } from './middlewares/error.middleware';
import { swaggerUi } from './utils/swagger';
const { swaggerDocs } = require('./utils/swagger');
import routes from './routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const NewPort = process.env.PORT;
app.use(errorHandler);

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

AppDataSource.initialize()
  .then(async () => {
    app.listen(NewPort, () => {
      console.log('Server is running on http://localhost:' + NewPort);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
