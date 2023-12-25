import { NextFunction, Request, Response } from 'express';
import { getAllUsers } from '../services/user.service';

export const getMeHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
