import { Repository } from 'typeorm';
import { RealEstate, Schedule } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const getScheduleFromRealEstateService = async (
  realEstateId: number
): Promise<RealEstate> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      schedules: {
        user: true,
      },
      category: true,
      address: true,
    },
  });

  if (!realEstate) {
    throw new AppError('RealEstate not found', 404);
  }

  return realEstate;
};

export default getScheduleFromRealEstateService;
