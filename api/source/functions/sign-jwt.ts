import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config/config';
import IUser from '../models/interfaces/user';

export const createToken = (user: IUser): string => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
    issuer: config.server.token.issuer,
    algorithm: 'HS256',
    expiresIn: '1h'
  });
};

export const validateToken = async (token: string): Promise<jwt.VerifyErrors | jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, paylaod) => {
      if (err) return reject(err);
      resolve(paylaod as JwtPayload);
    });
  });
};
