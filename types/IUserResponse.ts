import { Dayjs } from "dayjs";
export interface IUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface IUsers {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  updatedAt: Dayjs;
}

export interface IUsersById {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
}
