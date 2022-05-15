import { Accomodation } from './accomodation.model';
import { Attraction } from './attraction.model';
import { Destination } from './destination.model';
import { Group } from './group.model';
import { Information } from './information.model';

export interface JourneyBase {
  information: Information;
  destination: Destination;
  group: Group;
  attractions: Attraction[];
  accomodation: Accomodation;
}
