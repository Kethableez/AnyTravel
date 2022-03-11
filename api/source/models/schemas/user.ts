import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  birthdate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  isSubscribed: { type: Boolean, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);
