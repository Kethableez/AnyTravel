import { Request, Response, NextFunction, Router } from 'express';
import { HttpException } from '../../middleware/error-middleware';
import LoginResponse from './payload/loginResponse';
import UserService from './userService';

class UserController {
  public path = '/user';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, this.login);
  }

  private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body;
      const created = await this.userService.register(payload);
      res.status(200).json({ message: created });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction): Promise<LoginResponse | void> => {
    try {
      const payload = req.body;
      const response = await this.userService.login(payload);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
