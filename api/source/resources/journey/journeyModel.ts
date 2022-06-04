import { Document } from 'mongoose';
import Accomodation from '../../utils/models/accomodationModel';
import Address from '../../utils/models/addressModel';
import AttractionInfo from '../../utils/models/attractionInfoModel';
import Break from '../../utils/models/breakModel';
import Participant from '../../utils/models/participantModel';

interface JourneyModel extends Document {
  name: string;
  description: string;
  cover: string;
  startDate: Date;
  endDate: Date;
  groupId: any;
  participants: Participant[];
  destination: BaseAddress;
  meetingPlace: {
    place: string;
    date: Date;
    address: Address;
  };
  breaks: Break[];
  attractions: AttractionInfo[];
  accomodation: Accomodation;
}

export default JourneyModel;
