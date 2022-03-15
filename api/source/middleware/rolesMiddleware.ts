import { NextFunction, Request, Response } from 'express';
import { HttpException } from './errorMiddleware';

export function rolesMiddleware(role: string) {
  console.log(role);
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(role);
      const userRole: string = res.locals.user.role;
      if (!userRole) return next(new HttpException(401, 'No roles was found'));
      if (userRole !== role) return next(new HttpException(401, 'Insufficient priviliges'));
      return next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  };
}
