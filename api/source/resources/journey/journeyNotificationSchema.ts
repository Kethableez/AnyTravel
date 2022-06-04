import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import JourneyNotification from './journeyNotification.model';

const JourneyNotificationSchema = new Schema({
  journeyId: { type: String, required: true },
  recievers: { type: [Object], required: true }
});

export default mongoose.model<JourneyNotification>('JourneyNotification', JourneyNotificationSchema);
