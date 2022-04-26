import Address from './addressModel';

interface Accomodation {
  placeName: string;
  checkIn: Date;
  checkOut: Date;
  address: Address;
  additionalInfo: string;
  link?: string;
}

export default Accomodation;
