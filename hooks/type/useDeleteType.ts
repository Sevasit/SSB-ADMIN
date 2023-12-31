import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IResponseDefault } from "../../types/IResponseDefult";
import { deleteType, getTypes } from "../QueriesKey";
import { deleteTypesApi } from "@/app/api/type/typeApi";

export default function useDeleteTypes() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [deleteType],
    (payload) => deleteTypesApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getTypes]),
    }
  );
}
