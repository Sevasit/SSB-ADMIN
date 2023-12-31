import { IResponseDefault } from "../../../../types/IResponseDefult";
import { IUserCreate, IUserEdit } from "../../../../types/IUser";
import { IUsers, IUsersById } from "../../../../types/IUserResponse";
import AxiosCustom from "../../../../utils/AxiosApi";

export const getfindUsersApi = async () => {
  try {
    const response = await AxiosCustom.get<IUsers[]>("/auth/findUsers");
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getfindByIdUsersApi = async (id: string) => {
  try {
    const response = await AxiosCustom.get<IUsersById>(
      `/auth/findUserDataById?id=${id}`
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

export const deleteUsersApi = async (id: string) => {
  try {
    const response = await AxiosCustom.delete<IResponseDefault>(
      `/auth/delete?id=${id}`
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

export const createUsersApi = async (payload: IUserCreate) => {
  try {
    const response = await AxiosCustom.post<IResponseDefault>(
      `/auth/register`,
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

export const editUsersApi = async (payload: IUserEdit) => {
  try {
    const response = await AxiosCustom.patch<IResponseDefault>(
      `/auth/editUser`,
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
