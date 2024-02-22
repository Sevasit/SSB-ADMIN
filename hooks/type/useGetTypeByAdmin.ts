import { useQuery } from "@tanstack/react-query";
import { IType } from "../../types/IType";
import { getTypesByAdmin } from "../QueriesKey";
import { getFindTypesByAdminApi } from "@/app/api/type/typeApi";
const useGetTypesByAdmin = () => {
  return useQuery<IType[], { message: string }>(
    [getTypesByAdmin],
    async () => await getFindTypesByAdminApi()
  );
};

export default useGetTypesByAdmin;
