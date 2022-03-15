/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import { authMiddleware } from '../../middleware/authMiddleware';
import Controller from '../../utils/controllerModel';
import LoginResponse from './payload/loginResponse';
import UserService from './userService';

class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/data`, authMiddleware, this.getUserData);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/availability`, this.checkAvailability);
    this.router.post(`${this.path}/edit`, authMiddleware, this.editUserData);
    this.router.post(`${this.path}/remove`, authMiddleware, this.removeUser);
  }

  private register = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const payload = req.body;
      const message = await this.userService.register(payload);
      res.status(200).json({ message });
    } catch (error: any) {
      res.status(400).json({ errorMessage: error.message });
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

  private getUserData = async (req: Request, res: Response, next: NextFunction): Promise<LoginResponse | void> => {
    try {
      const user = res.locals.user;
      res.status(200).send({ data: user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private editUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const message = await this.userService.editUser(userId, req.body);
      res.status(200).json({ message });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const message = await this.userService.removeUser(userId, req.body);
      res.status(200).json({ message });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private checkAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<{ available: boolean } | void> => {
    try {
      const payload = req.body;
      const response = await this.userService.checkAvailability(payload);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
