import { IResponseDefault } from "../../../../types/IResponseDefult";
import { IType, ITypeCreate } from "../../../../types/IType";
import AxiosCustom from "../../../../utils/AxiosApi";

export const getfindTypesApi = async () => {
  try {
    const response = await AxiosCustom.get<IType[]>("/type/findAllType");
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const deleteTypesApi = async (id: string) => {
  try {
    const response = await AxiosCustom.delete<IResponseDefault>(
      `/type/delete?id=${id}`
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

export const createTypesApi = async (payload: ITypeCreate) => {
  try {
    const response = await AxiosCustom.post<IResponseDefault>(
      `/type/create`,
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
