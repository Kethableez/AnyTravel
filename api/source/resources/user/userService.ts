import LoginPayload from './payload/loginPayload';
import LoginResponse from './payload/loginResponse';
import RegisterPayload from './payload/registerPayload';
import userSchema from './userSchema';
import bcrypt from 'bcryptjs';
import { createToken } from '../../functions/sign-jwt';

class UserService {
  private userSchema = userSchema;

  public async register(payload: RegisterPayload): Promise<string | Error> {
    try {
      await this.userSchema.create({
        ...payload,
        avatar: 'default',
        role: 'RegularUser',
        isActive: true
      });

      return 'Created with success';
    } catch (error: any) {
      throw new Error(error.message);
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
    } catch (error: any) {
      throw new Error('Unable to create user');
    }
  }
}

export default UserService;
