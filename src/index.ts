import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { port } from './config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(morgan('tiny'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    // register express routes from defined application routes

    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    // setup express app here
    // ...

    // start express server
    app.listen(port);

    console.log(`Server has started on port ${port}`);
  })
  .catch((error) => console.log(error));
