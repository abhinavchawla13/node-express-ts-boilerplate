import { Router } from 'express';
import user from './user';

// guaranteed to get dependencies
export default (): Router => {
  const router: Router = Router();
  user(router);

  return router;
};
