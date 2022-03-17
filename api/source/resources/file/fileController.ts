/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, Router } from 'express';
import { HttpException } from '../../middleware/errorMiddleware';
import { uploadMiddleware } from '../../middleware/uploadMiddleware';
import fs from 'fs';
import Controller from '../../utils/models/controllerModel';
import { getPath } from '../../utils/pathParser';

class FileController implements Controller {
  public path = '/file';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get(`${this.path}/download/:selector/:filename`, this.download);
    this.router.post(`${this.path}/upload/:selector`, uploadMiddleware, this.upload);
    this.router.post(`${this.path}/delete/:selector/:filename`, this.remove);
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

  private remove = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const selector = req.params.selector;
      const filename = req.params.filename;

      const path = getPath(selector, filename);

      fs.unlink(path, (error) => {
        if (error) throw new HttpException(400, error.message);
        res.status(200).json({ message: `${filename} was removed` });
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default FileController;
