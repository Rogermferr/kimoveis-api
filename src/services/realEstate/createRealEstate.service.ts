import { Repository } from 'typeorm';
import { Address, Category, RealEstate } from '../../entities';
import {
  TRealEstateRequest,
  TRealEstateResponse,
} from '../../interfaces/realEstate.interfaces';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';
import { realEstateResponseSchema } from '../../schemas/realEstate.schemas';

const createRealEstateService = async (
  realEstateData: TRealEstateRequest
): Promise<TRealEstateResponse> => {
  const { address, categoryId, ...realEstate } = realEstateData;

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory: Category | null = await categoryRepository.findOneBy({
    id: categoryId,
  });

  if (!findCategory) {
    throw new AppError('Category not found', 404);
  }

  if (address.number) {
    const findAddress: Address | null = await addressRepository.findOne({
      where: {
        street: address.street,
        number: address.number,
      },
    });

    if (findAddress) {
      throw new AppError('Address already exists', 409);
    }
  }

  const newAddress: Address = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const newRealEstate: RealEstate = realEstateRepository.create({
    ...realEstate,
    address: newAddress,
    category: findCategory,
  });

  await realEstateRepository.save(newRealEstate);

  const realEstateReturn: TRealEstateResponse =
    realEstateResponseSchema.parse(newRealEstate);

  return realEstateReturn;
};

export default createRealEstateService;
