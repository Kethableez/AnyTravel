/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { HttpException } from '../../middleware/errorMiddleware';
import { rolesMiddleware } from '../../middleware/rolesMiddleware';
import Controller from '../../utils/models/controllerModel';
import AttractionService from './attractionService';

class AttractionController implements Controller {
  public path = '/attraction';
  public router = Router();
  private attractionService = new AttractionService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/all`, authMiddleware, this.getAll);
    this.router.get(`${this.path}/get/:attractionId`, authMiddleware, this.getAttraction);

    this.router.post(`${this.path}/create`, authMiddleware, this.createAttraction);
    this.router.post(
      `${this.path}/approve/:attractionId`,
      authMiddleware,
      rolesMiddleware('Moderator'),
      this.approveAttraction
    );
    this.router.post(
      `${this.path}/delete/:attractionId`,
      authMiddleware,
      rolesMiddleware('Moderator'),
      this.deleteAttraction
    );
    this.router.post(`${this.path}/review/:attractionId`, authMiddleware, this.addReview);
  }

  private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const attractions = await this.attractionService.getAll();

      res.status(200).json(attractions);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAttraction = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const attractionId = req.params.attractionId;
      const attraction = await this.attractionService.getAttraction(attractionId);

      res.status(200).json(attraction);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private createAttraction = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const payload = req.body;
      const message = await this.attractionService.createAttraction(payload);

      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private approveAttraction = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const attractionId = req.params.attractionId;
      const message = await this.attractionService.approveAttraction(attractionId);

      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private deleteAttraction = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const attractionId = req.params.attractionId;
      const message = await this.attractionService.deleteAttraction(attractionId);

      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private addReview = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const userId = res.locals.user._id;
      const attractionId = req.params.attractionId;
      const payload = req.body;
      const message = await this.attractionService.addReview(userId, attractionId, payload);

      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default AttractionController;
