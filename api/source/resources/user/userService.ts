import bcrypt from 'bcryptjs';

import { createToken } from '../../functions/token';
import { isEmpty } from 'lodash';

import userSchema from './userSchema';

import LoginPayload from './payload/loginPayload';
import RegisterPayload from './payload/registerPayload';
import AvailabilityPayload from './payload/availabilityPayload';
import EditPayload from './payload/editPayload';
import BaseResponse from '../../utils/models/baseResponseModel';
import AvailabilityResponse from './response/availabilityResponse';
import User from './userModel';
import { avatarPrefix } from '../../utils/filePrefix';
import { LoginResponse } from './response/loginResponse';

class UserService {
  private userSchema = userSchema;

  public async register(payload: RegisterPayload): Promise<BaseResponse | Error> {
    const { username, email } = payload;

    if (await this.checkIfUserExists({ username, email })) throw new Error('User already exists');

    try {
      await this.userSchema.create({
        ...payload,
        avatar: 'avatar/default.png',
        role: 'RegularUser',
        isActive: true
      });

      return { message: 'Created' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async login(payload: LoginPayload): Promise<LoginResponse | Error> {
    try {
      const { username, password } = payload;

      const user = await this.userSchema.findOne({ username });
      if (!user) {
        throw new Error('Invalid username');
      }
      if (await bcrypt.compare(password, user.password)) {
        const response: LoginResponse = {
          id: user._id,
          token: createToken(user)
        };
        return response;
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async editUser(userId: string, payload: EditPayload): Promise<BaseResponse | Error> {
    try {
      const userToEdit = await this.userSchema.findById(userId);

      if (!userToEdit) throw new Error('Invalid ID');

      if (payload.password && payload.oldPassword) {
        if (!(await bcrypt.compare(payload.oldPassword, userToEdit.password))) {
          payload.password = await bcrypt.hash(payload.password, 10);
        } else throw new Error('Invalid password');
      }
      if (payload.avatar) {
        payload.avatar = [avatarPrefix(), payload.avatar].join('/');
      }

      await this.userSchema.findByIdAndUpdate(userId, payload);

      return { message: 'Updated' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async deleteUser(userId: string, payload: { password: string }): Promise<BaseResponse | Error> {
    try {
      const userToDelete = await this.userSchema.findById(userId);

      if (!userToDelete) throw new Error('Invalid ID');

      if (!(await bcrypt.compare(payload.password, userToDelete.password))) throw new Error('Invalid password');

      await this.userSchema.findByIdAndDelete(userId);

      return { message: 'Deleted' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async checkAvailability(payload: AvailabilityPayload): Promise<AvailabilityResponse | Error> {
    try {
      const query = this.availabilityQuery(payload);

      const u = await this.userSchema.find(query).exec();
      const response: AvailabilityResponse = {
        available: isEmpty(u)
      };
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async getUsers(): Promise<User[] | Error> {
    try {
      const users = await this.userSchema.find();
      return users;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  private async checkIfUserExists(data: { username: string; email: string }): Promise<boolean | Error> {
    try {
      const result = await this.userSchema.find({ $or: [{ username: data.username }, { email: data.email }] }).exec();

      return !isEmpty(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  private availabilityQuery = (payload: AvailabilityPayload) => {
    const queryList = [
      {
        email: payload.value
      },
      {
        username: payload.value
      }
    ];
    const index = payload.selector === 'email' ? 0 : 1;

    return queryList[index];
  };
}

export default UserService;
