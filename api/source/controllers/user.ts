import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import { head, isEmpty } from 'lodash';
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

const getUserData = (req: Request, res: Response) => {
  const userId = res.locals.jwt.id;

  User.findById(userId)
    .exec()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(401).json({
        message: error.message,
        error
      });
    });
};

const getQuery = (selector: string, value: string) => {
  const queryList = [
    {
      email: value
    },
    {
      username: value
    }
  ];
  const index = selector === 'email' ? 0 : 1;

  return queryList[index];
};

const availability = (req: Request, res: Response) => {
  const { selector, value } = req.body;

  console.log(req.body);

  const query = getQuery(selector, value);

  User.find(query)
    .exec()
    .then((result) => {
      if (isEmpty(result)) {
        return res.status(200).json({
          available: true
        });
      } else {
        return res.status(200).json({
          available: false
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

export default {
  createUser,
  login,
  getUserData,
  availability
};
