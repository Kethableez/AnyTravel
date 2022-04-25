import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import Controller from '../../utils/models/controllerModel';
import JourneyService from './journeyService';

class JourneyController implements Controller {
  public path = '/journey';
  public router = Router();
  private journeyService = new JourneyService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/by-group/:groupId`, this.getJourneyByGroupId);
    this.router.get(`${this.path}/by-groups`, this.getJourneyByGroups);
    this.router.post(`${this.path}/create`, this.createJourney);
  }

  private createJourney = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.journeyService.createJourney(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getJourneyByGroupId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = req.params.groupId;
      const journeys = await this.journeyService.getJourneysByGroupId(groupId);
      res.status(200).json(journeys);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getJourneyByGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groups } = req.body;
      const journeys = await this.journeyService.getJourneysByGroups(groups);
      res.status(200).json(journeys);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default JourneyController;
