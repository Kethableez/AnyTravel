/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { HttpException } from '../../middleware/errorMiddleware';
import { rolesMiddleware } from '../../middleware/rolesMiddleware';
import validationMiddleware from '../../middleware/validationMiddleware';
import Controller from '../../utils/controllerModel';
import GroupService from './groupService';
import groupValidations from './groupValidations';
import JoinPayload from './payload/joinPayload';
import LeavePayload from './payload/leavePayload';

class GroupController implements Controller {
  public path = '/group';
  public router = Router();
  private groupService = new GroupService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/all`, authMiddleware, rolesMiddleware('Admin'), this.getAllGroups);
    this.router.get(`${this.path}/get/:groupId`, authMiddleware, this.getGroup);
    this.router.get(`${this.path}/user-groups`, authMiddleware, this.getUserGroups);

    this.router.post(
      `${this.path}/create`,
      authMiddleware,
      validationMiddleware(groupValidations.create),
      this.createGroup
    );
    this.router.post(
      `${this.path}/edit/:groupId`,
      authMiddleware,
      validationMiddleware(groupValidations.edit),
      this.editGroup
    );
    this.router.post(`${this.path}/delete/:groupId`, authMiddleware, this.removeGroup);
    this.router.post(
      `${this.path}/add/:groupId`,
      validationMiddleware(groupValidations.memberEmail),
      authMiddleware,
      this.addToGroup
    );
    this.router.post(
      `${this.path}/remove/:groupId`,
      validationMiddleware(groupValidations.memberId),
      authMiddleware,
      this.removeFromGroup
    );
    this.router.post(
      `${this.path}/join/:groupId`,
      validationMiddleware(groupValidations.invitationCode),
      authMiddleware,
      this.joinToGroup
    );
    this.router.post(`${this.path}/leave/:groupId`, authMiddleware, this.leaveGroup);
  }

  private getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const groups = await this.groupService.getAllGroups();

      res.status(200).json(groups);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const groupId = req.params.groupId;

      const group = await this.groupService.getGroup(groupId);
      res.status(200).json(group);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUserGroups = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = res.locals.user._id;

      const group = await this.groupService.getUserGroups(userId);
      res.status(200).json(group);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

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
      const payload: JoinPayload = {
        memberId: res.locals.user._id.toString(),
        groupId: req.params.groupId,
        invitationCode: req.body.invitationCode
      };

      const message = await this.groupService.joinToGroup(payload);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private leaveGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload: LeavePayload = {
        memberId: res.locals.user._id.toString(),
        groupId: req.params.groupId
      };

      const message = await this.groupService.leaveGroup(payload);

      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default GroupController;
