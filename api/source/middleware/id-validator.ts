import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const idValidator = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  if (ObjectId.isValid(userId)) {
    next();
  } else
    return res.status(400).json({
      message: 'Invalid Id'
    });
};

export default idValidator;
