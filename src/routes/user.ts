import { Router } from 'express';
import isAuthenticated from '../middlewares/authenticated';
import { login } from '../controllers/user/user';

const userRouter = Router();

export default (router: Router): void => {
  router.use('/user', userRouter);

  userRouter.post('/login', isAuthenticated, login);
};
