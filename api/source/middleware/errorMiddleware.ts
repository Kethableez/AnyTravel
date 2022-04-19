import { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  next({ status: 404, message: 'Not found' });
}

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json({
    message: message
  });
}

export default {
  notFoundMiddleware,
  errorMiddleware
};
