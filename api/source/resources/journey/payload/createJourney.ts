import Accomodation from '../../../utils/models/accomodationModel';
import AttractionInfo from '../../../utils/models/attractionInfoModel';

interface CreateJourneyPayload {
  information: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  };
  destination: BaseAddress;
  group: {
    id: string;
  };
  attractions: AttractionInfo[];
  accomodation: Accomodation;
}

export default CreateJourneyPayload;
