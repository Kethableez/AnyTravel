import { Document } from 'mongoose';

interface Group extends Document {
  name: string;
  coverPhotoRef: string;
  founder: any;
  members: any[];
  invitationCode: string;
  journeys: any[];
}

export default Group;
