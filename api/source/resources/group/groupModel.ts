import { Document } from 'mongoose';

interface Group extends Document {
  name: string;
  cover: string;
  founder: any;
  members: any[];
  invitationCode: string;
  journeys: any[];
}

export default Group;
