import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { HttpException } from '../../middleware/errorMiddleware';
import validationMiddleware from '../../middleware/validationMiddleware';
import Controller from '../../utils/models/controllerModel';
import JourneyService from './journeyService';
import journeyValidations from './journeyValidations';

class JourneyController implements Controller {
  public path = '/journey';
  public router = Router();
  private journeyService = new JourneyService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      `${this.path}/process/create`,
      validationMiddleware(journeyValidations.createProcess),
      authMiddleware,
      this.createProcess
    );
    this.router.post(
      `${this.path}/process/update/:processId`,
      validationMiddleware(journeyValidations.updateProcess),
      authMiddleware,
      this.updateProcess
    );
    this.router.post(`${this.path}/process/delete/:processId`, authMiddleware, this.deleteProcess);

    this.router.get(`${this.path}/process/get/:processId`, authMiddleware, this.getProcess);
  }

  private createProcess = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { journeyObject, step } = req.body;
      const senderId = res.locals.user._id;
      const response = await this.journeyService.createProcess(senderId, journeyObject, step);
      return res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updateProcess = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { journeyObject, step } = req.body;
      const processId = req.params.processId;
      const response = await this.journeyService.updateProcess(processId, journeyObject, step);
      return res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private deleteProcess = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const processId = req.params.processId;
      const response = await this.journeyService.deleteProcess(processId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getProcess = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const processId = req.params.processId;
      const response = await this.journeyService.getProcess(processId);
      return res.status(200).json(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default JourneyController;
