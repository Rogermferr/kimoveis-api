import { Request, Response } from 'express';
import {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
  TUsersResponse,
} from '../interfaces/users.interfaces';
import createUsersService from '../services/users/createUsers.service';
import getAllUsersService from '../services/users/getAllUsers.service';
import updateUsersService from '../services/users/updateUsers.service';
import deleteUsersService from '../services/users/deleteUsers.service';

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser: TUserResponse = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TUsersResponse = await getAllUsersService();

  return res.json(users);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);
  const userData: TUserUpdateRequest = req.body;

  const updatedUser: TUserResponse = await updateUsersService(userId, userData);

  return res.json(updatedUser);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  await deleteUsersService(userId);

  return res.status(204).send();
};

export {
  createUsersController,
  getAllUsersController,
  updateUsersController,
  deleteUsersController,
};
