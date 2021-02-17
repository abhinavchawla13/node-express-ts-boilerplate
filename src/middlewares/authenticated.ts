import { NextFunction, Request, Response } from 'express';
import { verifyIdToken } from '../services/firebase';
import { logger } from '../loaders/logger';

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (!authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const split = authorization.split('Bearer ');
  if (split.length !== 2)
    return res.status(401).send({ message: 'Unauthorized' });

  const token = split[1];

  try {
    const decodedToken = await verifyIdToken(token);
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    return next();
  } catch (err) {
    logger.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: 'Unauthenticated' });
  }
}

export default isAuthenticated;
