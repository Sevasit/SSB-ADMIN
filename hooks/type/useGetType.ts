import { useQuery } from "@tanstack/react-query";
import { IType } from "../../types/IType";
import { getfindTypes } from "@/app/api/type/typeApi";
import { getTypes } from "../QueriesKey";
const useGetType = () => {
  return useQuery<IType[], { message: string }>(
    [getTypes],
    async () => await getfindTypes()
  );
};

export default useGetType;
