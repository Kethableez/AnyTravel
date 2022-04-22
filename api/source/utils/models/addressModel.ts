interface Address {
  country: string;
  zipCode: string;
  city: string;
  street: string;
  apartment?: string;
  lat: number;
  lng: number;
}

export default Address;
