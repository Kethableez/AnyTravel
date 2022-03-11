import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import { head } from 'lodash';
import logger from '../config/logger';
import signJWT from '../functions/sign-jwt';
import IUser from '../models/interfaces/user';
import User from '../models/schemas/user';

const NAMESPACE = 'User Controller';

const createUser = (req: Request, res: Response) => {
  logger.info(NAMESPACE, 'Starting process: createUser()');

  const user: IUser = req.body;

  bcryptjs.hash(user.password, 10, (hashError, hash) => {
    if (hashError) {
      logger.error(NAMESPACE, 'Error occured during password hash.', hashError);
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }

    const newUser = new User({
      ...user,
      password: hash,
      avatar: 'default',
      role: 'RegularUser',
      isActive: true
    });

    newUser
      .save()
      .then(() => {
        return res.status(200).json({
          message: 'User created'
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error: error
        });
      });
  });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userDoc = await User.find({ username });

  if (userDoc.length !== 1) {
    return res.status(400).json({
      message: 'Invalid username'
    });
  }

  const user = head(userDoc) as IUser;

  bcryptjs.compare(password, user.password, (error, result) => {
    if (error) {
      return res.status(401).json({
        message: error.message,
        error
      });
    } else if (result) {
      signJWT(user as IUser, (_error, token) => {
        if (_error) {
          return res.status(500).json({
            message: 'An error has occured'
          });
        } else if (token) {
          return res.status(200).json({
            id: user?._id,
            token: token
          });
        }
      });
    } else {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }
  });
};

export default {
  createUser,
  login
};
