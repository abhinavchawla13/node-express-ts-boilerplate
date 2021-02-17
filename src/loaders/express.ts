import { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from '../routes';
import { logger } from './logger';
import config from './../config/config';

const expressLoader = (app: Application): void => {
  // Root Endpoint
  app.get('/', (req, res) => {
    res
      .status(200)
      .send(
        `Welcome to try36 Project's API 😀 [environment: ${config.heroku_env}, build: ${config.node_env}]`,
      );
  });

  // Health Checkpoint
  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'Connection Successful' });
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send({ message: 'Unable to find the requested resource!' });
  });

  /// error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  // celebrate/joi error catching
  app.use(errors());

  app.use((err: any, req: Request, res: Response) => {
    logger.error(err);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};

export default expressLoader;
