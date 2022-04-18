import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { getPath } from '../utils/pathParser';

const MAX_SIZE = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = getPath(req.params.selector);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const filename = [Date.now(), file.originalname].join('-');
    cb(null, filename);
  }
});

const fakeUploadMiddlewareMock = (req: Request, res: Response, next: NextFunction) => {
  next();
};

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE }
}).single('file');

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.API_ALLOW_FILE_UPLOAD === 'true') return upload(req, res, next);
  else return fakeUploadMiddlewareMock(req, res, next);
};
