import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import UserConfirm from './userConfirmModel';

const UserConfirmSchema = new Schema({
  userId: { type: String, required: true },
  activationCode: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiredAt: { type: Date, required: true },
  confirmedAt: { type: Date }
});

export default mongoose.model<UserConfirm>('UserConfirm', UserConfirmSchema);
