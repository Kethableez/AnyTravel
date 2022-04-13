import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import UserToken from './userTokenModel';

const RefreshTokenSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
  revokedAt: { type: Date },
  replaced: { type: String }
});

export default mongoose.model<UserToken>('RefreshToken', RefreshTokenSchema);
