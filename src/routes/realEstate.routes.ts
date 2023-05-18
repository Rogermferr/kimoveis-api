import { Router } from 'express';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureUserIsAdminMiddleware from '../middlewares/ensureUserIsAdmin.middleware';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import { realEstateRequestSchema } from '../schemas/realEstate.schemas';
import {
  createRealEstateController,
  getAllRealEstateController,
} from '../controllers/realEstate.controllers';

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureBodyIsValidMiddleware(realEstateRequestSchema),
  createRealEstateController
);
realEstateRoutes.get('', getAllRealEstateController);

export default realEstateRoutes;
