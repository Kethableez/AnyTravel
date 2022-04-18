import { Router, Request, Response, NextFunction } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import Controller from '../../utils/models/controllerModel';

class ConfigController implements Controller {
  public path = '/config';
  public router = Router();
  private configKeys = ['API_ALLOW_FILE_UPLOAD', 'API_REQUIRE_ACCOUNT_VERIFICATION', 'API_USE_LIMITER'];

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/get`, this.getConfig);
    this.router.post(`${this.path}/set`, this.setConfig);
  }

  private getConfig = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const config = Object.fromEntries(this.configKeys.map((key) => [key, process.env[key]]));

      res.status(200).json(config);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private setConfig = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { key, value } = req.body;
      if (!this.configKeys.includes(key)) throw new Error('Invalid config key');
      if (!['true', 'false'].includes(value)) throw new Error('Invalid config value');

      process.env[key] = value;

      return res.status(200).json({
        message: 'Changed',
        obj: process.env[key]
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default ConfigController;
