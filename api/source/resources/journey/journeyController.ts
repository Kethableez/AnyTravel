import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
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
    this.router.get(`${this.path}/by-group/:groupId`, authMiddleware, this.getJourneyByGroupId);
    this.router.get(`${this.path}/by-user`, authMiddleware, this.getUserJourneys);
    this.router.get(`${this.path}/by-id/:journeyId`, authMiddleware, this.getJourneyById);
    this.router.get(`${this.path}/notifications`, authMiddleware, this.getUserNotifications);
    this.router.post(`${this.path}/create`, authMiddleware, this.createJourney);
    this.router.post(`${this.path}/update-participation`, authMiddleware, this.updateParticipation);
    this.router.post(`${this.path}/mark-as-read/:notificationId`, authMiddleware, this.markNotificationAsRead);
  }

  private createJourney = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.journeyService.createJourney(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getJourneyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const journeyId = req.params.journeyId;
      const journey = await this.journeyService.getJourney(journeyId);
      res.status(200).json(journey);
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

  private getUserJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const journeys = await this.journeyService.getUserJourneys(userId);
      res.status(200).json(journeys);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updateParticipation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { memberId, journeyId, value } = req.body;
      const message = await this.journeyService.updateParticipation(journeyId, memberId, value);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUserNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const notifications = await this.journeyService.getJourneyNotifications(userId);
      res.status(200).json(notifications);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notificationId = req.params.notificationId;
      const userId = res.locals.user._id;
      const message = await this.journeyService.markAsRead(notificationId, userId);
      res.status(200).json(message);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default JourneyController;
