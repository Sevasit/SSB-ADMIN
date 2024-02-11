import { Dayjs } from "dayjs";
export interface IUserResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: {
    _id: string;
    typeName: string;
  };
}

export interface IUsers {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: {
    typeName: string;
  };
  createdAt: Dayjs;
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
