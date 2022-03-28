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
  additionalInfo: any[];
}

export default AttractionPayload;
