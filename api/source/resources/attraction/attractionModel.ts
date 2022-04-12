import { Document } from 'mongoose';

interface Attraction extends Document {
  name: string;
  description: string;
  cover: string;
  address: {
    country: string;
    zipCode: string;
    city: string;
    street: string;
    apartment?: string;
    lat: number;
    lng: number;
  };
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
