import { BaseResponse } from './base-response.model';

export interface ResponseWithError extends BaseResponse {
  error: any;
}
