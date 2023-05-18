import { Repository } from 'typeorm';
import {
  TUserResponse,
  TUserUpdateRequest,
} from '../../interfaces/users.interfaces';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { userResponseSchema } from '../../schemas/users.schemas';

const updateUsersService = async (
  userId: number,
  userData: TUserUpdateRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldData: User | null = await userRepository.findOneBy({ id: userId });

  const newUserData: User = userRepository.create({
    ...oldData,
    ...userData,
  });
  await userRepository.save(newUserData);

  const userReturn: TUserResponse = userResponseSchema.parse(newUserData);

  return userReturn;
};

export default updateUsersService;
