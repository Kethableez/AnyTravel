import { Request, Response } from 'express';

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorMiddleware(error: HttpException, req: Request, res: Response): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({
    status,
    message
  });
}

export default errorMiddleware;
