import { Address } from '@models/attraction/attration.model';

export interface Accomodation {
  placeName: string;
  checkIn: Date;
  checkOut: Date;
  additionalInfo: string;
  link: string;
  address: Address;
}
