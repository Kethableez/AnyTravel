import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import User from '../resources/user/userModel';

export const createToken = (user: User): string => {
  return jwt.sign({ id: user._id }, config.server.token.secret, {
    issuer: config.server.token.issuer,
    algorithm: 'HS256',
    expiresIn: '1h'
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
