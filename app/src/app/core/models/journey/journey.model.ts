import { Attraction } from '@models/attraction/attration.model'

export interface Journey {
  name: string;
  description: string;
  cover: string;
  startDate: Date;
  endDate: Date;
  groupId: any;
  // destination: BaseAddress;
  attractions: Attraction[];
  // accomodation: Accomodation;
}