import { Document } from 'mongoose';

interface UserConfirm extends Document {
  userId: string;
  activationCode: string;
  createdAt: Date;
  expiredAt: Date;
  confirmedAt: Date;
}

export default UserConfirm;
