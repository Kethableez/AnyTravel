import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

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

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;
  mongoose
    .model<IUser>('User')
    .find({ $or: [{ username: self.username }, { email: self.email }] })
    .exec()
    .then((docs) => {
      if (!docs.length) next();
      else next(new Error('User exists'));
    });
});

export default mongoose.model<IUser>('User', UserSchema);
