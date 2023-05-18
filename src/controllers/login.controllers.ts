import { Request, Response } from 'express';
import createLoginUsersService from '../services/login/createLoginUsers.service';
import { TLogin } from '../interfaces/login.interfaces';

const createLoginUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TLogin = req.body;

  const token: string = await createLoginUsersService(userData);

  return res.json({ token });
};

export { createLoginUsersController };
