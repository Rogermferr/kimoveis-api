import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';

const ensureUserIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = Number(res.locals.userId);
  const id: number = Number(req.params.id);
  const userAdmin: boolean = res.locals.userAdmin;

  if (!userAdmin && req.method === 'GET') {
    throw new AppError('Insufficient permission', 403);
  }

  if (!userAdmin && id !== userId) {
    throw new AppError('Insufficient permission', 403);
  }

  return next();
};

export default ensureUserIsAdminMiddleware;
