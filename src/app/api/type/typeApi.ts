import { IResponseDefault } from "../../../../types/IResponseDefult";
import { IType, ITypeCreate, ITypeEdit } from "../../../../types/IType";
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

export const getFindTypesIncludeAdmin = async () => {
  try {
    const response = await AxiosCustom.get<IType[]>(
      "/type/findAllTypeIncludeAdmin"
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

export const getFindTypesByAdminApi = async () => {
  try {
    const response = await AxiosCustom.get<IType[]>("/type/findAllTypeByAdmin");
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};

export const getfindTypesByIdApi = async (id: string) => {
  try {
    const response = await AxiosCustom.get<IType>(
      `/type/findTypeById?id=${id}`
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

export const editTypesApi = async (payload: ITypeEdit) => {
  try {
    const response = await AxiosCustom.patch<IResponseDefault>(
      `/type/edit`,
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
