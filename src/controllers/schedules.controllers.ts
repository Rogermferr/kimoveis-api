import { Request, Response } from 'express';
import { TSchedulesRequest } from '../interfaces/schedules.interfaces';
import createSchedulesService from '../services/schedules/createSchedules.service';
import { RealEstate, Schedule } from '../entities';
import { scheduler } from 'timers/promises';
import getScheduleFromRealEstateService from '../services/schedules/getScheduleFromRealEstate.service';

const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(res.locals.userId);
  const schedulesData: TSchedulesRequest = req.body;

  const schedule: string = await createSchedulesService(schedulesData, userId);

  return res.status(201).json({ message: schedule });
};

const getScheduleFromRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const scheduleId: number = Number(req.params.id);

  const realEstate: RealEstate = await getScheduleFromRealEstateService(
    scheduleId
  );

  return res.json(realEstate);
};

export { createSchedulesController, getScheduleFromRealEstateController };
