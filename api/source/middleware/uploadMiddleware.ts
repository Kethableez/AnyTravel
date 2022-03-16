import multer from 'multer';
import path from 'path';

const MAX_SIZE = 10 * 1024 * 1024;
const BASE_PATH = path.resolve('storage');

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

export const getPath = (selector: string, filename?: string) => {
  return filename ? path.join(BASE_PATH, selector, filename) : path.join(BASE_PATH, selector);
};

export const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE }
}).single('file');
