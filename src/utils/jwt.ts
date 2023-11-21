import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { privateKey, publicKey } from '../config';

export const signJwt = (payload: Object, options: SignOptions) => {
  const private_key = Buffer.from(privateKey, 'base64').toString('ascii');
  console.log(private_key);
  return jwt.sign(payload, private_key, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const public_key = Buffer.from(publicKey, 'base64').toString('ascii');
    return jwt.verify(token, public_key) as T;
  } catch (error) {
    return null;
  }
};
