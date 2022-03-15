import mongoose, { Schema } from 'mongoose';
import Group from './groupModel';

const ObjectId = mongoose.Types.ObjectId;

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  coverPhotoRef: { type: String, required: true },
  founder: { type: ObjectId, required: true },
  invitationCode: { type: String, required: true },
  members: { type: [ObjectId] },
  journeys: { type: [ObjectId] }
});

export default mongoose.model<Group>('Group', GroupSchema);
