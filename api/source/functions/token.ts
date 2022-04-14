import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';

export const createAuthToken = (payload: any) => {
  return jwt.sign(payload, config.server.token.secret, {
    issuer: config.server.token.issuer,
    expiresIn: config.server.token.authExpireTime
  });
};

export const validateToken = async (token: string): Promise<jwt.VerifyErrors | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.server.token.secret, (err, paylaod) => {
      if (err) return reject(err);
      resolve(paylaod as JwtPayload);
    });
  });
};
