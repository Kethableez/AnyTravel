import { Response } from './response.model';

export interface ResponseWithError extends Response {
  error: any;
}
