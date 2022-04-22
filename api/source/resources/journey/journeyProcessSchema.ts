import { Schema } from 'mongoose';
import JourneyProcess from './journeyProcessModel';
import mongoose from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const JourneyProcessSchema = new Schema({
  senderId: { type: ObjectId, required: true },
  journeyObject: { type: Object, required: true },
  step: { type: String, required: true }
});

export default mongoose.model<JourneyProcess>('JourneyProcess', JourneyProcessSchema);
