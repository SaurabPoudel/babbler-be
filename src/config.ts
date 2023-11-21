require('dotenv').config();

export const port = process.env.PORT || 3000;
export const dbPort = parseInt(process.env.DB_PORT) || 5432;
export const dbUser = process.env.DB_USER || 'postgres';
export const dbPassword = process.env.DB_PASSWORD || 'postgres';
export const database = process.env.DB;

export const privateKey = process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY;

export const publicKey = process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY;

export const accessTokenExpiresIn = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) || 15;

export const refreshTokenExpiresIn = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) || 60 * 24 * 7;

export const redisCacheExpiresIn = parseInt(process.env.REDIS_CACHE_EXPIRATION_TIME) || 60 * 24 * 7;
