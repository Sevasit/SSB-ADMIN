import { Dayjs } from "dayjs";

export interface ITaskPending {
  _id: string;
  name: string;
  type: string;
  building: string;
  createdAt: Dayjs;
}

export interface ITaskById {
  _id: string;
  name: string;
  phone: string;
  remark: string;
  type: string;
  building: string;
  location: string;
  status: string;
  imageStart: string;
  createdAt: Dayjs;
}

export interface ITaskConfirm {
  id: string;
  processBy: string;
  imageEnd: string;
}

export interface ITaskCurrent {
  _id: string;
  name: string;
  phone: string;
  createdAt: Dayjs;
}

export interface ITaskCount {
  label: Array<string>;
  count: Array<number>;
}

export interface ITaskCountToGraph {
  _id: string;
  type: string;
  count: number;
}
