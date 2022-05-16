import { Address } from '@models/attraction/attration.model';

export interface Meeting {
  placeName: string;
  meetingTime: Date;
  address: Address;
}
