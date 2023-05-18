import { z } from 'zod';
import {
  schedulesRequestSchema,
  schedulesSchema,
} from '../schemas/schedules.schemas';

type TSchedules = z.infer<typeof schedulesSchema>;

type TSchedulesRequest = z.infer<typeof schedulesRequestSchema>;

export { TSchedules, TSchedulesRequest };
