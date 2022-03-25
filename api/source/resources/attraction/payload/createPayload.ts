interface AttractionPayload {
  name: string;
  description: string;
  cover: string;
  address: {
    country: string;
    zipCode: string;
    city: string;
    street: string;
    apartment: string;
    lat: number;
    lng: number;
  };
  category: string;
  attractionType: string;
  isPaid: boolean;
  link: string;
  ticketPrice: string[];
  hours: string[];
}

export default AttractionPayload;
