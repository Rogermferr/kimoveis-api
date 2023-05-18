import { Repository } from 'typeorm';
import { TSchedulesRequest } from '../../interfaces/schedules.interfaces';
import { RealEstate, Schedule, User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const createSchedulesService = async (
  schedulesData: TSchedulesRequest,
  userId: number
): Promise<string> => {
  const scheduleDay: number = new Date(schedulesData.date).getDay();

  if (scheduleDay === 0 || scheduleDay === 6) {
    throw new AppError('Invalid date, work days are monday to friday', 400);
  }

  const scheduleHour: string[] = schedulesData.hour.split(':');

  const hour: number = Number(scheduleHour[0]) * 60 + Number(scheduleHour[1]);

  if (hour < 480 || hour > 1080) {
    throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
  }

  const schedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const user: User | null = await userRepository.findOneBy({ id: userId });

  const realEstate: RealEstate | null = await realEstateRepository.findOneBy({
    id: schedulesData.realEstateId,
  });

  const schedule: Schedule | null = await schedulesRepository
    .createQueryBuilder('schedules')
    .where(
      'schedules.date = :schedulesDate AND schedules.hour = :schedulesHour AND schedules.realEstateId = :realEstateId',
      {
        schedulesDate: schedulesData.date,
        schedulesHour: schedulesData.hour,
        realEstateId: schedulesData.realEstateId,
      }
    )
    .getOne();

  if (schedule) {
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409
    );
  }

  const scheduleUser: Schedule | null = await schedulesRepository
    .createQueryBuilder('schedules')
    .where(
      'schedules.date = :schedulesDate AND schedules.hour = :schedulesHour AND schedules.userId = :userId',
      {
        schedulesDate: schedulesData.date,
        schedulesHour: schedulesData.hour,
        userId: userId,
      }
    )
    .getOne();

  if (scheduleUser) {
    throw new AppError(
      'User schedule to this real estate at this date and time already exists',
      409
    );
  }

  if (!realEstate) {
    throw new AppError('RealEstate not found', 404);
  }

  const newSchedule: Schedule = schedulesRepository.create({
    ...schedulesData,
    realEstate: realEstate,
    user: user!,
  });

  await schedulesRepository.save(newSchedule);

  return 'Schedule created';
};

export default createSchedulesService;
