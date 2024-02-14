import { Dayjs } from "dayjs";

export interface ITaskHistory {
  _id: string;
  userId: string;
  name: string;
  phone: string;
  type: {
    typeName: string;
  };
  building: {
    nameBuilding: string;
  };
  status: string;
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export interface ITaskPending {
  _id: string;
  name: string;
  phone: string;
  type: {
    typeName: string;
  };
  building: {
    nameBuilding: string;
  };
  createdAt: Dayjs;
}

export interface ITaskById {
  _id: string;
  name: string;
  phone: string;
  remark: string;
  type: {
    typeName: string;
  };
  building: {
    nameBuilding: string;
  };
  location: string;
  status: string;
  imageStart: string;
  createdAt: Dayjs;
}

export interface ITaskReject {
  id: string;
  processBy: string;
  annotation: string;
}

export interface ITaskApprove {
  id: string;
  processBy: string;
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
