import { Document } from 'mongoose';
import Accomodation from '../../utils/models/accomodationModel';
import AttractionInfo from '../../utils/models/attractionInfoModel';

interface JourneyModel extends Document {
  name: string;
  description: string;
  cover: string;
  startDate: Date;
  endDate: Date;
  destination: BaseAddress;
  attractions: AttractionInfo[];
  accomodation: Accomodation;
}

export default JourneyModel;
