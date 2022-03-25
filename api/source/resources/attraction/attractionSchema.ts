import mongoose, { Schema } from 'mongoose';
import Attraction from './attractionModel';

const ObjectId = mongoose.Types.ObjectId;

const AttractionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  address: {
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    apartment: { type: String },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  reviews: {
    type: [Object],
    required: true
  },
  reviewRatio: { type: Number, required: true },
  isApproved: { type: Boolean, required: true },
  category: { type: String, required: true },
  attractionType: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
  ticketPrice: { type: [String] },
  link: { type: String },
  hours: { type: [String] }

  // additionalInfo: { type: [Object] }
});

export default mongoose.model<Attraction>('Attraction', AttractionSchema);
