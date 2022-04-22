import { Schema } from 'mongoose';
import JourneyModel from './journeyModel';
import mongoose from 'mongoose';

const JourneySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: Object, required: true },
  attractions: { type: [Object], required: true },
  accomodation: { type: Object, required: true }
});

export default mongoose.model<JourneyModel>('Journey', JourneySchema);
