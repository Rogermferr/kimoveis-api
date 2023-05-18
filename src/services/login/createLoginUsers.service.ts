import { Repository } from 'typeorm';
import { TLogin } from '../../interfaces/login.interfaces';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const createLoginUsersService = async (userData: TLogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: userData.email,
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const comparePass: boolean = await compare(userData.password, user.password);

  if (!comparePass || user.deletedAt) {
    throw new AppError('Invalid credentials', 401);
  }

  const token: string = sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: '24h',
      subject: String(user.id),
    }
  );

  return token;
};

export default createLoginUsersService;
