import { Dayjs } from "dayjs";

export interface IType {
  _id: string;
  typeName: string;
  typeCode: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export interface ITypeCreate {
  typeName: string;
  typeCode: string;
}

export interface ITypeEdit {
  _id: string;
  typeName: string;
  typeCode: string;
}
