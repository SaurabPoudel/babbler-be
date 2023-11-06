import { UserEntity } from '../entities/user.entity';
import { CreateUserInput } from '../schemas/user.schema';
import { AppDataSource } from '../data-source';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { accessTokenExpiresIn, redisCacheExpiresIn } from '../config';

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
export const signTokens = async (user: UserEntity) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: redisCacheExpiresIn * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signJwt(
    { sub: user.id },
    {
      expiresIn: `${accessTokenExpiresIn}m`,
    },
  );

  return { access_token };
};
