import { Router } from 'express';
import {
  createSchedulesController,
  getScheduleFromRealEstateController,
} from '../controllers/schedules.controllers';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import { schedulesRequestSchema } from '../schemas/schedules.schemas';
import ensureUserIsAdminMiddleware from '../middlewares/ensureUserIsAdmin.middleware';

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  '',
  ensureTokenIsValidMiddleware,
  ensureBodyIsValidMiddleware(schedulesRequestSchema),
  createSchedulesController
);
schedulesRoutes.get(
  '/realEstate/:id',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  getScheduleFromRealEstateController
);

export default schedulesRoutes;
