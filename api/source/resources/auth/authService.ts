import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Response } from 'express';

import RefreshToken from './userTokenModel';
import userSchema from '../user/userSchema';
import userTokenSchema from './userTokenSchema';
import { createAuthToken } from './../../functions/token';
import userConfirmSchema from './userConfirmSchema';

class AuthService {
  private userTokenSchema = userTokenSchema;
  private userConfirmSchema = userConfirmSchema;
  private userSchema = userSchema;

  public async login(res: Response, payload: any) {
    try {
      const { username, password } = payload;
      const user = await this.userSchema.findOne({ username: username });

      if (!user) throw new Error('Invalid username ');

      if (!user.isActive) throw new Error('User is not active');

      if (await bcrypt.compare(password, user.password)) {
        const userId = user._id.toString();
        const authToken = createAuthToken({ userId: userId });
        const refreshToken = await this.saveRefreshToken(userId);

        const response = {
          userId: userId,
          authToken: authToken
        };

        this.setCookie(res, refreshToken.token, refreshToken.expiresAt);

        return response;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async refresh(res: Response, payload: any) {
    try {
      const { token } = payload;
      const refreshToken = await this.getRefreshToken(token);
      const userId = refreshToken.userId;

      const newRefreshToken = await this.saveRefreshToken(userId);
      refreshToken.revokedAt = new Date();
      refreshToken.replaced = newRefreshToken.token;
      await refreshToken.save();

      const authToken = createAuthToken({ userId: userId });

      const response = {
        userId: userId,
        authToken: authToken
      };

      this.setCookie(res, refreshToken.token, refreshToken.expiresAt);

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async logout(res: Response, payload: any) {
    try {
      const { token } = payload;

      const refreshToken = await this.getRefreshToken(token);
      refreshToken.revokedAt = new Date();
      await refreshToken.save();
      this.clearCookie(res);

      return { message: 'Token revoked' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async resend(payload: any) {
    try {
      const { confirmId } = payload;
      const confirmation = await this.userConfirmSchema.findById(confirmId);
      if (!confirmation) throw new Error('Invalid confirmation ID');
      if (confirmation.confirmedAt) throw new Error('Confirmation has already been confirmed');
      if (new Date() < confirmation.createdAt) throw new Error('Confirmation has not yet expired');

      const user = await this.userSchema.findById(confirmation.userId);
      if (!user) throw new Error('User with given ID not found');
      if (user.isActive) throw new Error('User with given ID is already active');

      confirmation.activationCode = this.createToken();
      confirmation.createdAt = new Date();

      await confirmation.save();

      return { message: 'Confirmation code resent' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public async confirm(payload: any) {
    try {
      const { confirmId, activationCode } = payload;

      const confirmation = await this.userConfirmSchema.findById(confirmId);

      if (!confirmation) throw new Error('Invalid confirmation ID');
      if (activationCode !== confirmation.activationCode) throw new Error('Invalid confirmation code');
      if (new Date() >= confirmation.confirmedAt) throw new Error('Confirmation has expired');

      const user = await this.userSchema.findById(confirmation.userId);
      if (!user) throw new Error('User with given ID not found');
      if (user.isActive) throw new Error('User with given ID is already active');

      confirmation.confirmedAt = new Date();
      user.isActive = true;

      await confirmation.save();
      await user.save();

      return { message: 'Account activated' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  public setCookie(res: Response, token: string, expires: Date) {
    const cookieOptions = {
      httpOnly: true,
      expires: expires
    };
    res.cookie('refreshToken', token, cookieOptions);
  }

  public clearCookie(res: Response) {
    res.clearCookie('refreshToken');
  }

  private async saveRefreshToken(userId: string) {
    return this.userTokenSchema.create({
      userId: userId,
      token: this.createToken(),
      createdAt: new Date(),
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    });
  }

  private async getRefreshToken(token: string) {
    try {
      const refreshToken = await this.userTokenSchema.findOne({ token: token });
      if (!refreshToken || !this.isTokenActive(refreshToken)) throw new Error('Invalid token');
      return refreshToken;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected error');
    }
  }

  private isTokenExpired(token: RefreshToken) {
    return new Date() >= token.expiresAt;
  }

  private isTokenActive(token: RefreshToken) {
    return !token.revokedAt && !this.isTokenExpired(token);
  }

  private createToken() {
    return crypto.randomUUID();
  }
}

export default AuthService;
