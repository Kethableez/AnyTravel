import Accomodation from '../../../utils/models/accomodationModel';
import AttractionInfo from '../../../utils/models/attractionInfoModel';

interface CreateJourneyPayload {
  information: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  };
  participants: string[];
  destination: BaseAddress;
  group: {
    id: string;
    participants: string[];
  };
  attractions: AttractionInfo[];
  accomodation: Accomodation;
}

export default CreateJourneyPayload;
