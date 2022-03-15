import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateToken } from '../functions/token';
import userSchema from '../resources/user/userSchema';
import { HttpException } from './errorMiddleware';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return next(new HttpException(401, 'Unauthorized'));
  }
  const accessToken = token.split(' ')[1];
  try {
    const payload = await validateToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorised'));
    }

    const user = await userSchema.findById(payload.id).select('-password').exec();

    if (!user) {
      return next(new HttpException(401, 'Unauthorised'));
    }

    res.locals.user = user;

    return next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Unexpected error');
  }
}
