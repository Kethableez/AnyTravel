import mongoose, { Schema } from 'mongoose';
import User from './userModel';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, required: true },
  birthdate: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
  isSubscribed: { type: Boolean, required: true }
});

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<User>('User', UserSchema);
