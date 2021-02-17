import config from './config/config';

import express from 'express';
import { logger, expressLogger } from './loaders/logger';
// const Logger = require('./loaders/logger');

import loaders from './loaders';

async function startServer() {
  const app = express();
  app.use(expressLogger);

  // time to load all the loaders before starting the app
  await loaders(app);

  app.listen(config.port, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
