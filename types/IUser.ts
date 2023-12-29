export interface IUserCreate {
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface IUserEdit {
  id: string;
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  newPassword: string;
  role: string;
}
