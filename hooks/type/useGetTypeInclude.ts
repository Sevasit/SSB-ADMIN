import { useQuery } from "@tanstack/react-query";
import { IType } from "../../types/IType";
import { getTypesInclude } from "../QueriesKey";
import { getFindTypesIncludeAdmin } from "@/app/api/type/typeApi";
const useGetTypeIncludeAdmin = () => {
  return useQuery<IType[], { message: string }>(
    [getTypesInclude],
    async () => await getFindTypesIncludeAdmin()
  );
};

export default useGetTypeIncludeAdmin;
