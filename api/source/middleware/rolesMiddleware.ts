import { NextFunction, Request, Response } from 'express';
import { HttpException } from './errorMiddleware';

export async function regularUserMiddleware(expectedRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole: string = res.locals.user.role;
      if (!userRole) return next(new HttpException(401, 'No roles was found'));
      if (userRole === expectedRole) return next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  };
}
