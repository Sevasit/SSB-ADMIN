import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { editType, getTypes } from "../QueriesKey";
import { editTypesApi } from "@/app/api/type/typeApi";

export default function useEditType() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [editType],
    (payload) => editTypesApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([getTypes]),
    }
  );
}
