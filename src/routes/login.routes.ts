import { Router } from 'express';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import { loginSchema } from '../schemas/login.schemas';
import { createLoginUsersController } from '../controllers/login.controllers';

const loginRoutes: Router = Router();

loginRoutes.post(
  '',
  ensureBodyIsValidMiddleware(loginSchema),
  createLoginUsersController
);

export default loginRoutes;
