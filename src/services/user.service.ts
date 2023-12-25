import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../schemas/user.schema';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import config from 'config';
const userRepository = AppDataSource.getRepository(UserEntity);

export const createUser = async (input: CreateUserInput) => {
  return (await AppDataSource.manager.save(AppDataSource.manager.create(UserEntity, input))) as UserEntity;
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async ({ id }: { id: string }) => {
  return await userRepository.findOneBy({ id });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const getAllUsers = async () => {
  return await userRepository.find({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      verified: true,
    },
  });
};

export const signTokens = async (user: UserEntity) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};
