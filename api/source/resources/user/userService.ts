import bcrypt from 'bcryptjs';

import { createToken } from '../../functions/token';
import { isEmpty } from 'lodash';

import userSchema from './userSchema';

import LoginPayload from './payload/loginPayload';
import LoginResponse from './payload/loginResponse';
import RegisterPayload from './payload/registerPayload';
import AvailabilityPayload from './payload/availabilityPayload';

class UserService {
  private userSchema = userSchema;

  public async register(payload: RegisterPayload): Promise<string | Error> {
    const { username, email } = payload;

    if (await this.checkIfUserExists({ username, email })) throw new Error('User already exists');

    try {
      await this.userSchema.create({
        ...payload,
        avatar: 'default',
        role: 'RegularUser',
        isActive: true
      });

      return 'Created with success';
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

  public async editUser(userId: string, payload: EditPayload) {
    try {
      const userToEdit = await this.userSchema.findById(userId);

      if (!userToEdit) throw new Error('Invalid ID');

      if (payload.password && payload.oldPassword) {
        if (!(await bcrypt.compare(payload.oldPassword, userToEdit.password))) {
          payload.password = await bcrypt.hash(payload.password, 10);
        } else throw new Error('Invalid password');
      }

      await this.userSchema.findByIdAndUpdate(userId, payload);

      return 'Updated';
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async removeUser(userId: string, payload: { password: string }) {
    try {
      const userToRemove = await this.userSchema.findById(userId);

      if (!userToRemove) throw new Error('Invalid ID');

      if (!(await bcrypt.compare(payload.password, userToRemove.password))) throw new Error('Invalid password');

      await this.userSchema.findByIdAndDelete(userId);

      return 'User deleted';
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async checkAvailability(payload: AvailabilityPayload) {
    try {
      const query = this.availabilityQuery(payload);

      const u = await this.userSchema.find(query).exec();
      const response = {
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

  public async getUsers() {
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

  private async checkIfUserExists(data: { username: string; email: string }) {
    const result = await this.userSchema.find({ $or: [{ username: data.username }, { email: data.email }] }).exec();

    return !isEmpty(result);
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

interface EditPayload {
  oldPassword: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  avatar: string;
  isSubscribed: boolean;
}

export default UserService;
