import { Document } from 'mongoose';

interface User extends Document {
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

export default User;
