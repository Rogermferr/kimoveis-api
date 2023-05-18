import { z } from 'zod';
import {
  userRequestSchema,
  userResponseSchema,
  usersResponseSchema,
} from '../schemas/users.schemas';
import { DeepPartial } from 'typeorm';

type TUserRequest = z.infer<typeof userRequestSchema>;

type TUserResponse = z.infer<typeof userResponseSchema>;

type TUsersResponse = z.infer<typeof usersResponseSchema>;

type TUserUpdateRequest = DeepPartial<TUserRequest>;

export { TUserRequest, TUserResponse, TUsersResponse, TUserUpdateRequest };
