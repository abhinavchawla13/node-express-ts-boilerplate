import { Application } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import { initializeFirebase } from './../services/firebase';
import { logger } from './logger';

export default async function (app: Application): Promise<void> {
  await mongooseLoader();
  logger.info('🗄️ MongoDB connected ');

  await expressLoader(app);
  logger.info('✌️ Express loaded');

  await initializeFirebase();
  logger.info('🧡 Firebase loaded');
}
