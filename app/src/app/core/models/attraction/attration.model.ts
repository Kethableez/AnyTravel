export interface Attraction {
  _id: string;
  name: string;
  description: string;
  cover: string;
  address: Address;
  reviews: any[];
  reviewRatio: number;
  isApproved: boolean;
  category: string;
  attractionType: string;
  isPaid: boolean;
  link: string;
  ticketPrice: string[];
  hours: string;
}

export interface Address {
  country: string;
  zipCode: string;
  city: string;
  street: string;
  apartment?: string;
  lat: number;
  lng: number;
}
