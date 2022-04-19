import { Request, Response, NextFunction } from 'express';

export function resourcePassMiddleware(req: Request, res: Response, next: NextFunction) {
  const method = req.method;
  const call = req.url.split('/').filter((part) => part === 'download' || part === 'file');
  if (method && call.includes('download') && call.includes('file'))
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
}

export function optionSkipMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    return res.status(200).json({});
  }

  next();
}
