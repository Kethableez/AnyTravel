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
    this.router.post(`${this.path}/delete/:groupId`, authMiddleware, this.removeGroup);
    this.router.post(`${this.path}/add/:groupId`, authMiddleware, this.addToGroup);
    this.router.post(`${this.path}/remove/:groupId`, authMiddleware, this.removeFromGroup);
    this.router.post(`${this.path}/join/:groupId`, authMiddleware, this.joinToGroup);
    this.router.post(`${this.path}/leave/:groupId`, authMiddleware, this.leaveGroup);
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

  private addToGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const founderId = res.locals.user._id;
      const groupId = req.params.groupId;
      const { memberEmail } = req.body;

      console.log(req.body);

      const message = await this.groupService.addToGroup(founderId, groupId, memberEmail);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private removeFromGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const founderId = res.locals.user._id;
      const groupId = req.params.groupId;
      const { memberId } = req.body;

      const message = await this.groupService.removeFromGroup(founderId, groupId, memberId);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private joinToGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const memberId = res.locals.user._id;
      const groupId = req.params.groupId;
      const { invitationCode } = req.body;

      const message = await this.groupService.joinToGroup(memberId, groupId, invitationCode);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private leaveGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const memberId = res.locals.user._id.toString();
      const groupId = req.params.groupId;
      const message = await this.groupService.leaveGroup(memberId, groupId);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default GroupController;
