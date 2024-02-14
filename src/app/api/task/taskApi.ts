import { IResponseDefault } from "../../../../types/IResponseDefult";
import {
  ITaskApprove,
  ITaskById,
  ITaskConfirm,
  ITaskCount,
  ITaskCountToGraph,
  ITaskCurrent,
  ITaskHistory,
  ITaskPending,
  ITaskReject,
} from "../../../../types/ITask";
import AxiosCustom from "../../../../utils/AxiosApi";

export const getFindAllTaskHistory = async () => {
  try {
    const response = await AxiosCustom.get<ITaskHistory[]>(
      "/tasks/findAllTaskHistory"
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getFindByIdApi = async (id: string) => {
  try {
    const response = await AxiosCustom.get<ITaskById>(
      `/tasks/findById?id=${id}`
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getFindPendingByAdminApi = async () => {
  try {
    const response = await AxiosCustom.get<ITaskPending[]>(
      `/tasks/findPendingByAdmin`
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getFindPendingByTypeApi = async (type: string) => {
  try {
    const response = await AxiosCustom.get<ITaskPending[]>(
      `/tasks/findPendingByType?type=${type}`
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getFindCompleteByTypeApi = async (type: string) => {
  try {
    const response = await AxiosCustom.get<ITaskPending[]>(
      `/tasks/findCompleteByType?type=${type}`
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getFindCurrentTaskByTypeApi = async (type: string) => {
  try {
    const response = await AxiosCustom.get<ITaskCurrent[]>(
      `/tasks/findCurrentTaskByType?type=${type}`
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const findTaskCount = async () => {
  try {
    const response = await AxiosCustom.get<ITaskCount>(`/tasks/findTaskCount`);
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const findTaskCountToGraph = async () => {
  try {
    const response = await AxiosCustom.get<ITaskCountToGraph[]>(
      `/tasks/findTaskCountToGraph`
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const rejectTaskApi = async (payload: ITaskReject) => {
  try {
    const response = await AxiosCustom.patch<IResponseDefault>(
      `/tasks/sendTaskReject`,
      payload
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const approveTaskApi = async (payload: ITaskApprove) => {
  try {
    const response = await AxiosCustom.patch<IResponseDefault>(
      `/tasks/sendTaskApprove`,
      payload
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const sendTaskApi = async (payload: ITaskConfirm) => {
  try {
    const response = await AxiosCustom.patch<IResponseDefault>(
      `/tasks/sendTask`,
      payload
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};
