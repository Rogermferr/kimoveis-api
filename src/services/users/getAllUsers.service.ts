import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { usersResponseSchema } from '../../schemas/users.schemas';
import { TUsersResponse } from '../../interfaces/users.interfaces';

const getAllUsersService = async (): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find({
    withDeleted: true,
  });

  const usersReturn: TUsersResponse = usersResponseSchema.parse(users);

  return usersReturn;
};

export default getAllUsersService;
