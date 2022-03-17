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
  additionalInfo: any[];
  isApproved: boolean;
}

export default Attraction;
