import { HttpException } from './../../middleware/errorMiddleware';
import { Request, Response, NextFunction, Router } from 'express';
import Controller from '../../utils/models/controllerModel';
import AuthService from './authService';

class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private authService = new AuthService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.path}/login`, this.login); //Payload validator
    this.router.post(`${this.path}/refresh`, this.refresh);
    this.router.post(`${this.path}/logout`, this.logout);
    this.router.post(`${this.path}/confirm`, this.confirm); //Payload validator
    this.router.post(`${this.path}/resend`, this.resend); //Payload validatod
  }

  private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { username, password } = req.body;
      const response = await this.authService.login(res, { username, password });

      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private refresh = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const token = req.cookies.refreshToken;

      const response = await this.authService.refresh(res, { token });

      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private logout = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const token = req.cookies.refreshToken;

      const response = await this.authService.logout(res, { token });
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private confirm = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const response = await this.authService.confirm(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private resend = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const response = await this.authService.resend(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default AuthController;
