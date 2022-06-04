import { Document } from 'mongoose';

interface JourneyNotification extends Document {
  journeyId: string;
  recievers: any[];
}

export default JourneyNotification;
