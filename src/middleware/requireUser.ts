import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return next(new AppError(401, 'You are not logged in'));
    }
    next();
  } catch (err: any) {
    next(err);
  }
};
