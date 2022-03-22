export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  birthdate: Date;
  isActive: boolean;
  isSubscribed: boolean;
}
