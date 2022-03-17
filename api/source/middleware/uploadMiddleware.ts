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

export const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE }
}).single('file');
