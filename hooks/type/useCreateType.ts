import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { createType, getTypesByAdmin } from "../QueriesKey";
import { createTypesApi } from "@/app/api/type/typeApi";

export default function useCreateType() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [createType],
    (payload) => createTypesApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getTypesByAdmin]),
    }
  );
}
