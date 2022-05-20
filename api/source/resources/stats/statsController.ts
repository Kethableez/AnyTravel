import express, { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import Controller from '../../utils/models/controllerModel';
import StatService from './statsService';

class StatsController implements Controller {
  public path = '/stats';
  public router = express.Router();
  private statService = new StatService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/attraction-ranking`, this.getAttractionRanking);
    this.router.get(`${this.path}/city-ranking`, this.getCityRanking);
  }

  private getAttractionRanking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.statService.getAttractionRanking();

      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getCityRanking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.statService.getCityRanking();

      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default StatsController;
