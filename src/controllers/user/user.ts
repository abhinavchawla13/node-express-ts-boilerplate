import { Request, Response } from 'express';
import { logger } from '../../loaders/logger';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).send(res.locals.uid);
  } catch (error) {
    logger.error('login fn: ', error);
    return res.status(401).send(error);
  }
};

export { login };
