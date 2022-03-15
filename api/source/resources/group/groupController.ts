import { Request, Response, NextFunction, Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { HttpException } from '../../middleware/errorMiddleware';
import Controller from '../../utils/controllerModel';
import GroupService from './groupService';

class GroupController implements Controller {
  public path = '/group';
  public router = Router();
  private groupService = new GroupService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.path}/create`, authMiddleware, this.createGroup);
    this.router.post(`${this.path}/edit/:groupId`, authMiddleware, this.editGroup);
    this.router.post(`${this.path}/remove/:groupId`, authMiddleware, this.removeGroup);
  }

  private createGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body;
      const userId = res.locals.user._id;

      const message = await this.groupService.createGroup(userId, payload);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private editGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body;
      const groupId = req.params.groupId;
      const userId = res.locals.user._id;

      const message = await this.groupService.editGroup(userId, groupId, payload);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private removeGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const groupId = req.params.groupId;
      const userId = res.locals.user._id;

      const message = await this.groupService.removeGroup(userId, groupId);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default GroupController;
