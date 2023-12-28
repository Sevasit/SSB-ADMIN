import { IType } from "../../../../types/IType";
import AxiosCustom from "../../../../utils/AxiosApi";

export const getfindTypes = async () => {
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
