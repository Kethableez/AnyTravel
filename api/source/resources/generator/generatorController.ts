import express from 'express';
import Controller from '../../utils/models/controllerModel';
import { Request, Response, NextFunction } from 'express';
import GeneratorService from './generatorService';
import { HttpException } from '../../middleware/errorMiddleware';

class GeneratorController implements Controller {
  public path = '/generator';
  public router = express.Router();
  private GeneratorService = new GeneratorService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/user/:number`, this.generateUsers);
  }

  private generateUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const number = Number(req.params.number);
      const users = await this.GeneratorService.generateUsers(number);
      res.status(200).json(users);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default GeneratorController;
