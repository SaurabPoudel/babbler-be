import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import { createUser, findUserByEmail, signTokens } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  signed: true,
};

if (process.env.NODE_ENV === 'production') {
  cookiesOptions.secure = true;
}

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(Date.now() + parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) * 1000),
  maxAge: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) * 1000,
};

export const registerUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const { name, password, email } = req.body;

    const user = await createUser({
      name,
      email: email.toLowerCase(),
      password,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'UserEntity with that email already exist',
      });
    }
    next(err);
  }
};
export const loginUserHandler = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });
    if (!user || !(await UserEntity.comparePasswords(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    const { access_token } = await signTokens(user);

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: -1 });
  res.cookie('refresh_token', '', { maxAge: -1 });
  res.cookie('logged_in', '', { maxAge: -1 });
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    await redisClient.del(user.id);
    logout(res);
    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};
