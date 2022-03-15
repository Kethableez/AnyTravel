/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import { authMiddleware } from '../../middleware/authMiddleware';
import { rolesMiddleware } from '../../middleware/rolesMiddleware';
import Controller from '../../utils/controllerModel';
import UserService from './userService';
import validationMiddleware from '../../middleware/validationMiddleware';
import userValidations from './userValidations';
import User from './userModel';
import LoginResponse from './userResponse';
import BaseResponse from '../../utils/baseResponseModel';
import AvailabilityResponse from './response/availabilityResponse';

class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/data`, authMiddleware, this.getUserData);
    this.router.get(`${this.path}/all`, authMiddleware, rolesMiddleware('Admin'), this.getAll);
    this.router.post(`${this.path}/login`, validationMiddleware(userValidations.login), this.login);
    this.router.post(`${this.path}/register`, validationMiddleware(userValidations.register), this.register);
    this.router.post(
      `${this.path}/availability`,
      validationMiddleware(userValidations.availability),
      this.checkAvailability
    );
    this.router.post(
      `${this.path}/edit`,
      authMiddleware,
      validationMiddleware(userValidations.edit),
      this.editUserData
    );
    this.router.post(
      `${this.path}/remove`,
      authMiddleware,
      validationMiddleware(userValidations.remove),
      this.removeUser
    );
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

  private getUserData = async (req: Request, res: Response, next: NextFunction): Promise<User | void> => {
    try {
      const user = res.locals.user;
      res.status(200).send({ data: user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private editUserData = async (req: Request, res: Response, next: NextFunction): Promise<BaseResponse | void> => {
    try {
      const userId = res.locals.user._id;
      const message = await this.userService.editUser(userId, req.body);
      res.status(200).json({ message });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private removeUser = async (req: Request, res: Response, next: NextFunction): Promise<BaseResponse | void> => {
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
  ): Promise<AvailabilityResponse | void> => {
    try {
      const payload = req.body;
      const response = await this.userService.checkAvailability(payload);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAll = async (req: Request, res: Response, next: NextFunction): Promise<User[] | void> => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
