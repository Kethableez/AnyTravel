import { Document } from 'mongoose';

interface JourneyProcess extends Document {
  senderId: string;
  journeyObject: any;
  step: string;
}

export default JourneyProcess;
