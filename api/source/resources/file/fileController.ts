/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import Controller from '../../utils/controllerModel';
import { getPath, uploadMiddleware } from '../../middleware/uploadMiddleware';

class FileController implements Controller {
  public path = '/file';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.path}/upload/:selector`, uploadMiddleware, this.upload);
    this.router.get(`${this.path}/download/:selector/:filename`, this.download);
  }

  private upload = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const filename = req.file?.filename;

      res.status(200).json({
        message: 'Uploaded',
        filename: filename
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private download = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const selector = req.params.selector;
      const filename = req.params.filename;

      const path = getPath(selector, filename);

      res.download(path, filename);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default FileController;
