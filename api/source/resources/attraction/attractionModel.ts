import { Document } from 'mongoose';
import Address from '../../utils/models/addressModel';

interface Attraction extends Document {
  name: string;
  description: string;
  cover: string;
  address: Address;
  reviews: [
    {
      userId: any;
      review: number;
    }
  ];
  reviewRatio: number;
  isApproved: boolean;
  category: string;
  attractionType: string;
  isPaid: boolean;
  link: string;
  ticketPrice: string;
  hours: string;
}

export default Attraction;
