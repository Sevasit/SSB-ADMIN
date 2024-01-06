import { QueryClient, useMutation } from "@tanstack/react-query";
import { IType } from "../../types/IType";
import { getTypesById } from "../QueriesKey";
import { getfindTypesByIdApi } from "@/app/api/type/typeApi";

export default function useGetTypeById() {
  const queryClient = new QueryClient();
  return useMutation<IType, { message: string }, any>(
    [getTypesById],
    async (payload) => await getfindTypesByIdApi(payload),
    {
      onMutate: async (payload) => {
        // Reset the query here when the `id` changes
        await queryClient.resetQueries(payload);
      },
    }
  );
}
