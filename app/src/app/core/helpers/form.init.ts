const loginForm = {
  username: '',
  password: ''
};

const registerForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  birthdate: '',
  isSubscribed: false
};

const attractionForm = {
  name: '',
  description: '',
  cover: '',
  category: '',
  attractionType: '',
  isPaid: false,
  ticketPrice: '',
  link: '',
  hoursFrom: '',
  hoursTo: ''
};

const addressForm = {
  country: '',
  zipCode: '',
  city: '',
  street: '',
  apartment: '',
  lat: 0,
  lng: 0
};

export const initialFroms = {
  loginForm,
  registerForm,
  attractionForm,
  addressForm
};
