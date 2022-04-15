/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import { authMiddleware } from '../../middleware/authMiddleware';
import { rolesMiddleware } from '../../middleware/rolesMiddleware';
import UserService from './userService';
import validationMiddleware from '../../middleware/validationMiddleware';
import userValidations from './userValidations';
import User from './userModel';
import BaseResponse from '../../utils/models/baseResponseModel';
import AvailabilityResponse from './response/availabilityResponse';
import Controller from '../../utils/models/controllerModel';

class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/all`, authMiddleware, rolesMiddleware('Admin'), this.getAll);
    this.router.get(`${this.path}/data`, authMiddleware, this.getUserData);

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
      `${this.path}/delete`,
      authMiddleware,
      validationMiddleware(userValidations.remove),
      this.deleteUser
    );
  }

  private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body;
      const message = await this.userService.register(payload);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUserData = async (req: Request, res: Response, next: NextFunction): Promise<User | void> => {
    try {
      const user = res.locals.user;
      res.status(200).send(user);
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

  private deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<BaseResponse | void> => {
    try {
      const userId = res.locals.user._id;
      const message = await this.userService.deleteUser(userId, req.body);
      res.status(200).json(message);
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
