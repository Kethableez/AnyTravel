export interface Attraction {
  _id: string;
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
  reviews: any[];
  additionalInfo: any[];
  isApproved: boolean;
}
