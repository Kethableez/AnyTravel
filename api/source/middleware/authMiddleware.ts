import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateToken } from '../functions/token';
import userSchema from '../resources/user/userSchema';
import { HttpException } from './errorMiddleware';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return next(new HttpException(401, 'Unauthorized `'));
  }
  const accessToken = token.split(' ')[1];
  try {
    const payload = await validateToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorised 2'));
    }

    const user = await userSchema.findById(payload.userId).select('-password').exec();

    if (!user) {
      return next(new HttpException(401, 'Unauthorised 3'));
    }

    res.locals.user = user;

    return next();
  } catch (error: any) {
    return next(new HttpException(401, error.message));
  }
}
