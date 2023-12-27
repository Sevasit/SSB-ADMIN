import { IResponseDefault } from "../../../../types/IResponseDefult";
import { IUsers } from "../../../../types/IUserResponse";
import AxiosCustom from "../../../../utils/AxiosApi";

export const getfindUsers = async () => {
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

export const deleteUsers = async (id: string) => {
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
