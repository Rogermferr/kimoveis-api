import { Router } from 'express';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureUserIsAdminMiddleware from '../middlewares/ensureUserIsAdmin.middleware';
import {
  createCategoriesController,
  getAllCategoriesController,
  getAllPropertiesByCategoryController,
} from '../controllers/categories.controllers';

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  createCategoriesController
);
categoriesRoutes.get('', getAllCategoriesController);
categoriesRoutes.get('/:id/realEstate', getAllPropertiesByCategoryController);

export default categoriesRoutes;
