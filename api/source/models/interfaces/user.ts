import { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  birthdate: Date;
  isActive: boolean;
  isSubscribed: boolean;
}

export default IUser;
