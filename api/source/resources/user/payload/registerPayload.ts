interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  isSubscribed: boolean;
}

export default RegisterPayload;
