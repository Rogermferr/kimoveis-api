import { Router } from 'express';
import {
  createUsersController,
  deleteUsersController,
  getAllUsersController,
  updateUsersController,
} from '../controllers/users.controllers';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import {
  userRequestSchema,
  userSchemaUpdateRequest,
} from '../schemas/users.schemas';
import ensureEmailExistsMiddleware from '../middlewares/ensureEmailExists.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureUserIsAdminMiddleware from '../middlewares/ensureUserIsAdmin.middleware';
import ensureIdExistsMiddleware from '../middlewares/ensureIdExists.middleware';

const usersRoutes: Router = Router();

usersRoutes.post(
  '',
  ensureBodyIsValidMiddleware(userRequestSchema),
  ensureEmailExistsMiddleware,
  createUsersController
);
usersRoutes.get(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  getAllUsersController
);
usersRoutes.patch(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureIdExistsMiddleware,
  ensureUserIsAdminMiddleware,
  ensureBodyIsValidMiddleware(userSchemaUpdateRequest),
  updateUsersController
);
usersRoutes.delete(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureIdExistsMiddleware,
  ensureUserIsAdminMiddleware,
  deleteUsersController
);

export default usersRoutes;
